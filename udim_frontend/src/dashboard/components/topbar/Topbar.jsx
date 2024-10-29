import './Topbar.css'
import { FiAlignJustify } from '../allIcon'
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { ToggleContext } from '../../ContextWrapper'
import { useGroup, useAuth } from '../../../apiAndContext';
import groupAPI from '../../../backend/groups';

const Groups = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const { groups, setGroups } = useGroup();
  const { userData } = useAuth();

  // Check if userData is defined before accessing id
  const user_id = userData?.id;

  useEffect(() => {
    // Fetch groups if user_id is available
    if (user_id) {
      groupAPI.getGroups(user_id)
        .then((data) => {
          setGroups(data || []);
        })
        .catch((error) => {
          console.error("Failed to fetch groups:", error);
        })
    }
  }, [user_id]);


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

const Topbar = () => {
  const { handleToggle } = useContext(ToggleContext)
  const { userData } = useAuth()
  return (
    <div className="topbar">
      <div className="toggle">
        <FiAlignJustify color='black' onClick={handleToggle} />
      </div>
      <div className="search">
        <Groups />
      </div>
      <div className="user">
        <img src={userData.image_url} alt={userData.first_name} />
      </div>
    </div>
  );
};

export default Topbar;
