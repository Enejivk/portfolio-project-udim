import { createContext, useContext } from 'react';


export const GroupContext = createContext({
  groups: [],
  addGroup: (group) => {},
  updateGroup: (group_id, group) => {},
  deleteGroup: (group_id) => {},
});

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = GroupContext.Provider; 
