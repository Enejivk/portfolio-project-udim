// src/apiAndContext/groupContext/useGroupApi.js
import useAxiosPrivate from '../../form/Authentication/useAxiosPrivate';

export const useGroupApi = () => {
  const axiosPrivate = useAxiosPrivate();

  // Fetch all groups for a specific user
  const getGroups = async (user_id) => {
    try {
      const response = await axiosPrivate.get(`/api/users/${user_id}/groups`);
      const { groups } = response.data;  // Destructure to get groups
      return groups;
    } catch (error) {
      console.error("Error while fetching user's groups:", error);
      return null;
    }
  };

  // Add a new group
  const addGroup = async (groupData) => {
    try {
      const response = await axiosPrivate.post('/api/groups', groupData);
      const { group } = response.data;
      return group;
    } catch (error) {
      console.error('Error while adding a new group:', error);
      return null;
    }
  };

  // Update a specific group
  const updateGroup = async (group_id, updatedGroupData) => {
    try {
      const response = await axiosPrivate.put(`/api/groups/${group_id}`, updatedGroupData);
      const { group } = response.data;
      return group;
    } catch (error) {
      console.error(`Error while updating group ${group_id}:`, error);
      return null;
    }
  };

  // Delete a specific group
  const deleteGroup = async (group_id) => {
    try {
      await axiosPrivate.delete(`/api/groups/${group_id}`);
      return group_id;
    } catch (error) {
      console.error(`Error while deleting group ${group_id}:`, error);
      return null;
    }
  };

  return { getGroups, addGroup, updateGroup, deleteGroup };
};
