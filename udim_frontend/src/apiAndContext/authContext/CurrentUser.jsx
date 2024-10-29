// import { createContext, useState, useEffect, useContext } from 'react';
// // import { axiosPrivate } from '../form/Authentication/axios';
// import useAxiosPrivate from '../../form/Authentication/useAxiosPrivate';

// export const CurrentUserContext = createContext()

// export const CurrentUserProvider = ({ children }) => {
//   const axiosPrivate = useAxiosPrivate();
//   const [currentUser, setCurrentUser] = useState(null)

//     // Define async function within useEffect
//     useEffect(() => {
//       const fetchCurrentUser = async () => {
//         try {
//           const response = await axiosPrivate.get('/api/users/me');
//           setCurrentUser(response?.data);
//           console.log(response.data);
//         } catch (error) {
//           console.error("Error fetching current user:", error);
//         }
//       };
//       fetchCurrentUser();
//     }, [axiosPrivate]);


//     const updateCurrentUser = async (id, formData) => {
//       try {
//         // const data = JSON.stringify(formData);
//         const headers = {
//           'Content-Type': 'multipart/form-data',
//         };

//         const response = await axiosPrivate.put(`/api/users/${id}`, formData, { headers });

//         setCurrentUser(response.data.user)
//         // console.log("This is my Response: ", response.data);

//       } catch (error) {
//         console.error("Error updating user: ", error);
//       }
//     };

//   return (
//     <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser }}>
//       {children}
//     </CurrentUserContext.Provider>
//   )
// }

// export const useCurrentUser = () => useContext(CurrentUserContext)