import React, { createContext, useContext, useState } from 'react';
import useAxiosPrivate from '../form/Authentication/useAxiosPrivate';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const handleAddGroup = async (groupData) => {
        try {
            const response = await axiosPrivate.post('/api/groups', groupData);
            const { group } = response.data;
            setGroups((prevGroups) => [...prevGroups, group]);
        } catch (error) {
            console.error("Failed to add group:", error);
        }
    };

    const handleUpdateGroup = async (group_id, updatedGroupData) => {
        try {
            const response = await axiosPrivate.put(`/api/groups/${group_id}`, updatedGroupData);
            const { updatedGroup } = response.data;
            setGroups((prevGroups) =>
                prevGroups.map((group) => (group.id === group_id ? updatedGroup : group))
            );
        } catch (error) {
            console.error("Failed to update group:", error);
        }
    };

    const handleDeleteGroup = async (group_id) => {
        try {
            await axiosPrivate.delete(`/api/groups/${group_id}`);
            setGroups((prevGroups) => prevGroups.filter((group) => group.id !== group_id));
        } catch (error) {
            console.error("Failed to delete group:", error);
        }
    };

    const handleGetGroupById = (groupId) => {
        // console.log('In context, groupId:', groupId);
        if (groupId) return groups.find((group) => group.id === parseInt(groupId));
    };
    

    return (
        <GroupContext.Provider value={{ groups, setGroups, selectedGroupId, setSelectedGroupId,
         addGroup: handleAddGroup, updateGroup: handleUpdateGroup,
         deleteGroup: handleDeleteGroup,  getGroupById: handleGetGroupById}}>
            {children}
        </GroupContext.Provider>
    );
};

export const useGroup = () => useContext(GroupContext);