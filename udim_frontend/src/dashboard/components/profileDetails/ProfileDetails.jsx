import { useState } from 'react';
import './ProfileDetail.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../apiAndContext';
import authService from '../../../backend/auth';

const EditProfile = ({setToggleEditForm}) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Loop through formData and append each field to formDataToSend
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Append the file to FormData if one was selected
    if (file) {
      formDataToSend.append('image', file);
    }

    try {
      await authService.updateCurrentUser(userData.id, formDataToSend);
      setToggleEditForm((prev)=>(!prev));
      navigate(from, { replace: true });
      // console.log('Form submitted with data:', formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="profile-picture"
        id="profile-picture"
        placeholder="Update profile picture"
        // Add handling logic for file uploads if necessary
        onChange={handleFileChange}
      />
      <input
        type="text"
        name="first_name"
        placeholder="first name"
        value={formData.first_name || userData.first_name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="last name"
        value={formData.last_name || userData.last_name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        disabled
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone || userData.phone}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address || userData.address}
        onChange={handleInputChange}
      />
      <button type="submit">Save changes</button>
    </form>
  );
};

const ProfileDetails = () => {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const { userData } = useAuth();

  if (!userData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={userData.image_url} alt="Profile"/>
      </div>
      <div className="profile-details">
        <h2>{userData.first_name}</h2>
        <h2>{userData.last_name}</h2>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Address: {userData.address}</p>
        <button className="edit-btn" onClick={() => setToggleEditForm(!toggleEditForm)}>
          Edit Profile
        </button>
      </div>
      {toggleEditForm && <EditProfile value={setToggleEditForm}/>}
    </div>
  );
};

export default ProfileDetails;
