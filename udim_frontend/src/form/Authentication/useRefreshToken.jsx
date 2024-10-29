// import axios from './axios';
// import { useEffect } from 'react';
// import {useAuth} from '../../apiAndContext';

// /**
//  * Custom hook to handle refreshing authentication token and initializing auth state from localStorage.
//  * @returns {Function} A function to refresh the authentication token.
//  */
// const useRefreshToken = () => {
//     const { auth, setAuth } = useAuth();
//     const existingToken = auth.refresh_token;

//     // Function to refresh token
//     const refresh = async () => {
//         try {
//             const response = await axios.post('/auth/refresh', {}, {
//                 headers: {
//                     'Authorization': `Bearer ${existingToken}`
//                 },
//                 withCredentials: true
//             });

//             // Update auth state with new access token
//             setAuth(prevAuth => ({
//                 ...prevAuth,
//                 token: response.data.access_token
//             }));

//             return response.data.access_token;
//         } catch (error) {
//             console.error('Error refreshing token:', error);
//             // Handle error as needed
//             throw error;
//         }
//     };

//     // Use useEffect to initialize auth state from localStorage
//     useEffect(() => {
//         const storedAuth = localStorage.getItem('auth');
//         if (storedAuth) {
//             setAuth(JSON.parse(storedAuth));
//         }
//     }, [setAuth]);

//     return refresh;
// };

// export default useRefreshToken;
