import axios from 'axios';

export default class AxiosConfig {
  constructor(baseURL, intercept=false) {
    this.axios = axios.create({
      baseURL, // Your API base URL
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(intercept) this.addAxiosInterceptor();
  }

  getTokens() {
    // Get tokens from localStorage once and parse it
    const storedTokens = localStorage.getItem('tokens'); // Ensure the same key is used for both get and set
    const tokens = storedTokens ? JSON.parse(storedTokens) : {};
    return tokens;
  }

  removeAxiosInterceptor() {
    this.axios.interceptors.request.eject(this.reqIntercept);  // Correct instance used
    this.axios.interceptors.response.eject(this.resIntercept);
  }

  // Simulate refreshing the token
  async #refreshToken() {
    try {
      const tokens = this.getTokens();
      const refreshToken = tokens?.refresh_token || null;

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      this.removeAxiosInterceptor();
      // Send the refresh request with the refresh token
      const response = await this.axios.post('/auth/refresh', {}, {
        headers: { 'Authorization': `Bearer ${refreshToken}` },
      });

      // Update the tokens with the new access token
      const newAccessToken = response?.data?.access_token;
      tokens.access_token = newAccessToken;

      // Save the updated tokens back to localStorage
      localStorage.setItem('tokens', JSON.stringify(tokens));  // Ensure consistency in key
      this.addAxiosInterceptor();
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error; // Re-throw the error so that the calling code can handle it
    }
  }

  addAxiosInterceptor() {
    // Request interceptor to add the Bearer token
    this.reqIntercept = this.axios.interceptors.request.use(
      (config) => {
        const tokens = this.getTokens();
        if (tokens && tokens.access_token) {  // Ensure tokens exist
          config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle 401 errors
    this.resIntercept = this.axios.interceptors.response.use(
      (response) => response, // Pass through successful responses
      async (error) => {
        const originalRequest = error.config;

        // Check if the error is a 401 (Unauthorized) and the request has not been retried
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;  // Mark the request to avoid infinite loops

          // Try to refresh the token
          const newAccessToken = await this.#refreshToken();
          if (newAccessToken) {
            // Set the new token in the Authorization header
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Retry the original request
            return this.axios(originalRequest);
          }
        }

        // Reject the error if it's not handled
        return Promise.reject(error);
      }
    );
  }
}
