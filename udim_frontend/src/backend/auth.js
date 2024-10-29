import AxiosConfig from './axios';

export class AuthService extends AxiosConfig {

  async #revokeAccessToken() {
    const tokens = this.getTokens();
    const accessToken = tokens?.access_token || '';
    if (accessToken) {
      try {
        await this.axios.delete('/auth/revoke_access', {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
      } catch (error) {
        throw (error);
      }
    }
  }
  async #revokeRefreshToken() {
    const tokens = this.getTokens();
    const refreshToken = tokens?.refresh_token || '';
    if (refreshToken) {
      this.removeAxiosInterceptor();
      try {
        await this.axios.delete('/auth/revoke_refresh', {
          headers: { 'Authorization': `Bearer ${refreshToken}` },
        });
      } catch (error) {
        throw (error);
      }
    }
  }

  async createAccount(data) {
    try {
      const response = await this.axios.post('/auth/register', JSON.stringify(data));
      if (response.status === 200) {
        return this.login({ email: data.email, password: data.password })
      } else {
        return response.data;
      }
    } catch (error) {
      throw (error);
    }
  }

  async login(data) {
    try {
      // console.log(data);
      const response = await this.axios.post('/auth/login', JSON.stringify(data));
      localStorage.setItem('tokens', JSON.stringify(response.data));
      this.addAxiosInterceptor();
      return response;
    } catch (error) {
      throw error
    }
  }

  async getCurrentUser() {
    let response;
    try {
      // const tokens = this.getTokens();
      // if(!tokens || !Object.keys(tokens).length) return null;
      const response = await this.axios.get('/api/users/me');
      return response.data;
    } catch (error) {
      console.log("error getting the current user ", error);
      throw error;
    }
  }

  async updateCurrentUser(id, formData) {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const response = await this.axios.put(`/api/users/${id}`, formData, { headers });

      return response.data.user;
      // console.log("This is my Response: ", response.data);

    } catch (error) {
      console.error("Error updating user: ", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.#revokeAccessToken();
      await this.#revokeRefreshToken();
      localStorage.removeItem('tokens');
    } catch (error) {
      console.log("Logout error", error);
      throw (error);
    }
  }
}

const authService = new AuthService('http://localhost:5001')

export default authService