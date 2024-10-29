import './Topbar.css'
import { FiAlignJustify } from '../allIcon'
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { ToggleContext } from '../../ContextWrapper'
import useAuth from '../../../form/Authentication/useAuth';
import useAxiosPrivate from '../../../form/Authentication/useAxiosPrivate';


const Groups = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [ groups, setGroups ] = useState([]);
    const { currentUser } = useAuth();
    const axiosPrivate = useAxiosPrivate();
  
    // Check if userData is defined before accessing id
  
    useEffect(() => {
      // Fetch groups if user_id is available
      if (currentUser) {
        axiosPrivate.get(`/api/users/${currentUser.id}/groups`)
          .then((data) => {
            setGroups(data.groups || []);
          })
          .catch((error) => {
            console.error("Failed to fetch groups:", error);
          })
      }
    }, [currentUser]);
  
  
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
    return (
      <div>
        <label>
          Select Group
          <select value={selectedValue} onChange={handleChange}>
            {
              groups.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))
            }
          </select>
        </label>
      </div>
    );
}
  
// const Groups = () => {
//     const [selectedValue, setSelectedValue] = useState('');
//     const [ groups, setGroups ] = useState([]);
//     const { currentUser } = useAuth();
//     const axiosPrivate = useAxiosPrivate();
//     useEffect(() => {
//         const controller = new AbortController();

//         const getGroups = async () => {
//             try {
//                 const response = await axiosPrivate.get(`/api/users/${currentUser.id}/groups`, {
//                     signal: controller.signal
//                 });
//                 const {groups} = response.data
//                 console.log(groups);
//                 setGroups(groups);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         getGroups();

//         return () => {
//             controller.abort();
//         };
//     }, [axiosPrivate, currentUser]);

//     const handleChange = (event) => {
//         setSelectedValue(event.target.value);
//     };

//     return (
//         <div>
//             <label>
//                 Select Group
//                 <select value={selectedValue} onChange={handleChange}>
//                     {
//                         groups.map((group) => (
//                             <option key={group.id} value={group.name}>
//                                 {group.name}
//                             </option>
//                         ))
//                     }
//                 </select>
//             </label>
//         </div>
//     );
// }


const Topbar = () => {
    const { handleToggle, istoggleMenu } = useContext(ToggleContext)
    const { currentUser } = useAuth();
    return (
        <div className="topbar">
            <div className="toggle">
                <FiAlignJustify color='black' onClick={handleToggle} />
            </div>
            <div className="search">
                <Groups />
            </div>
            <div className="user">
                <img src={currentUser.image_url} alt="" />
            </div>
        </div>
    );
};

export default Topbar;
