import './Topbar.css';
import { FiAlignJustify } from '../allIcon';
import { useState, useEffect, useContext } from 'react';
import { ToggleContext } from '../../ContextWrapper';
import useAuth from '../../../form/Authentication/useAuth';
import useAxiosPrivate from '../../../form/Authentication/useAxiosPrivate';
import { useGroup } from '../../../apiAndContext';

const Groups = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const { groups, setGroups, setSelectedGroupId, selectedGroupId } = useGroup();
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axiosPrivate.get(`/api/users/${currentUser?.id}/groups`);
        setGroups(res?.data?.groups || []);
        // console.log('userMe', currentUser);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    if (currentUser?.id) fetchGroups();
  }, [currentUser, axiosPrivate, setGroups]);


  // Set default SelectedGroupId on mount, if groups are loaded
  useEffect(() => {
    if (groups.length > 0 && !selectedValue) {
      setSelectedValue(groups[0].name);
      setSelectedGroupId(groups[0].id);
      // console.log('in uses effect top bar', groups[0].name, selectedGroupId);
    }
  }, [groups, setSelectedGroupId, selectedValue]);

  const handleChange = (event) => {
    const selectedGroupId = event.target.options[event.target.selectedIndex].getAttribute('data-id');
    setSelectedValue(event.target.value);
    setSelectedGroupId(selectedGroupId);
    // console.log('am in handle change', selectedGroupId)
  };

  return (
    <div>
      <label>
        Select Group
        <select value={selectedValue} onChange={handleChange}>
          {groups.map((group) => (
            <option key={group.id} value={group.name} data-id={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const Topbar = () => {
  const { handleToggle } = useContext(ToggleContext);
  const { currentUser } = useAuth();

  return (
    <div className="topbar">
      <div className="toggle">
        <FiAlignJustify color="black" onClick={handleToggle} />
      </div>
      <div className="search">
        <Groups />
      </div>
      <div className="user">
        <img src={currentUser?.image_url} alt="Profile" />
      </div>
    </div>
  );
};

export default Topbar;
