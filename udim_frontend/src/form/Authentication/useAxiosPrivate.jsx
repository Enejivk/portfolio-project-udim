// import { useEffect } from 'react';
// import axios from './axios'; // Ensure this imports your axios instance
// import {useAuth} from "../../apiAndContext";
// import useRefreshToken from './useRefreshToken';

// /**
//  * Custom hook for handling private Axios requests with automatic token refresh.
//  * Intercepts requests to add the Authorization header with the current token.
//  * Intercepts responses to handle token expiration (status 401) by refreshing
//  * the token and retrying the request.
//  * @returns {Object} The configured Axios instance.
//  */
// const useAxiosPrivate = () => {
//     const { auth } = useAuth();
//     const refresh = useRefreshToken();

//     useEffect(() => {
//         const requestIntercept = axios.interceptors.request.use(
//             config => {
//                 if (!config.headers['Authorization']) {
//                     config.headers['Authorization'] = `Bearer ${auth?.token}`;
//                 }
//                 return config;
//             },
//             error => Promise.reject(error)
//         );

//         const responseIntercept = axios.interceptors.response.use(
//             response => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 if (error?.response?.status === 401 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     const newAccessToken = await refresh();
//                     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     return axios(prevRequest);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axios.interceptors.request.eject(requestIntercept);
//             axios.interceptors.response.eject(responseIntercept);
//         };
//     }, [auth, refresh]);

//     return axios;
// };

// export default useAxiosPrivate;
