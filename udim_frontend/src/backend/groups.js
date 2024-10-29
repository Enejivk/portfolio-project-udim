import AxiosConfig from "./axios";

class GroupApi extends AxiosConfig {

  // Fetch all groups for a specific user
  async getGroups(user_id) {
    try {
      const response = await this.axios.get(`/users/${user_id}/groups`);
      const { groups } = response.data;  // Destructure to get groups
      return groups;
    } catch (error) {
      console.error("Error while fetching user's groups:", error);
      return null;
    }
  };

  // Add a new group
  async addGroup(groupData) {
    try {
      const response = await this.axios.post('/groups', groupData);
      const { group } = response.data;
      return group;
    } catch (error) {
      console.error('Error while adding a new group:', error);
      return null;
    }
  };

  // Update a specific group
  async updateGroup(group_id, updatedGroupData) {
    try {
      const response = await this.axios.put(`/groups/${group_id}`, updatedGroupData);
      const { group } = response.data;
      return group;
    } catch (error) {
      console.error(`Error while updating group ${group_id}:`, error);
      return null;
    }
  };

  // Delete a specific group
  async deleteGroup(group_id) {
    try {
      await this.axios.delete(`/api/groups/${group_id}`);
      return group_id;
    } catch (error) {
      console.error(`Error while deleting group ${group_id}:`, error);
      return null;
    }
  };

}

const groupAPI = new GroupApi('http://localhost:5001/api', true);
export default groupAPI;