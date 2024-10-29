import {useState } from 'react';
import { useGroup } from '../../../apiAndContext';
import './Group.css';

const GroupsManager = () => {
  const { groups, addGroup, updateGroup, deleteGroup } = useGroup();
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editGroupName, setEditGroupName] = useState('');

  const handleAddGroup = async () => {
    if (newGroupName.trim()) {
      await addGroup({ name: newGroupName });
      setNewGroupName('');
    }
  };

  const handleEditGroup = async (group) => {
    setEditingGroupId(group.id);
    setEditGroupName(group.name);
  };

  const handleSaveEdit = async () => {
    if (editingGroupId && editGroupName.trim()) {
      await updateGroup(editingGroupId, { name: editGroupName });
      setEditingGroupId(null);
      setEditGroupName('');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    await deleteGroup(groupId);
  };

  return (
    <div className="groups-manager">
      <h2>User Groups</h2>
      
      <div className="add-group">
        <input
          type="text"
          placeholder="New group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>

      <ul className="group-list">
        {groups.map((group) => (
          <li key={group.id}>
            {editingGroupId === group.id ? (
              <div>
                <input
                  type="text"
                  value={editGroupName}
                  onChange={(e) => setEditGroupName(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingGroupId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{group.name}</span>
                <button onClick={() => handleEditGroup(group)}>Edit</button>
                <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsManager;
