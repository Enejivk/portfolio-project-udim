import React, { createContext, useContext, useState } from 'react';
import groupAPI from '../../backend/groups';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const handleAddGroup = async (groupData) => {
    try {
      const newGroup = await groupAPI.addGroup(groupData);
      setGroups((prevGroups) => [...prevGroups, newGroup]);
    } catch (error) {
      console.error("Failed to add group:", error);
    }
  };

  const handleUpdateGroup = async (group_id, updatedGroupData) => {
    try {
      const updatedGroup = await groupAPI.updateGroup(group_id, updatedGroupData);
      setGroups((prevGroups) =>
        prevGroups.map((group) => (group.id === group_id ? updatedGroup : group))
      );
    } catch (error) {
      console.error("Failed to update group:", error);
    }
  };

  const handleDeleteGroup = async (group_id) => {
    try {
      await groupAPI.deleteGroup(group_id);
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== group_id));
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  return (
    <GroupContext.Provider value={{ groups, setGroups, addGroup: handleAddGroup, updateGroup: handleUpdateGroup, deleteGroup: handleDeleteGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext);
