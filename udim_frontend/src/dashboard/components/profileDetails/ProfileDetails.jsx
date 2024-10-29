import { useState } from 'react';
import { userLogin } from '../allIcon';
import './ProfileDetail.css';
import useAuth from '../../../form/Authentication/useAuth';
import useAxiosPrivate from '../../../form/Authentication/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom';


const EditProfile = () => {
  const {currentUser, setCurrentUser} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    address: currentUser.address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      const response = await axiosPrivate.put(`/api/users/${currentUser.id}`, formDataToSend, { headers });

      const updatedUser =  response.data.user;
      setCurrentUser(updatedUser);
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
        value={formData.first_name || currentUser.first_name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="last name"
        value={formData.last_name || currentUser.last_name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={currentUser.email}
        disabled
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone || currentUser.phone}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address || currentUser.address}
        onChange={handleInputChange}
      />
      <button type="submit">Save changes</button>
    </form>
  );
};

const ProfileDetails = () => {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={currentUser.image_url} alt="Profile"/>
      </div>
      <div className="profile-details">
        <h2>{currentUser.first_name}</h2>
        <h2>{currentUser.last_name}</h2>
        <p>Email: {currentUser.email}</p>
        <p>Phone: {currentUser.phone}</p>
        <p>Address: {currentUser.address}</p>
        <button className="edit-btn" onClick={() => setToggleEditForm(!toggleEditForm)}>
          Edit Profile
        </button>
      </div>
      {toggleEditForm && <EditProfile value={setToggleEditForm}/>}
    </div>
  );
};

export default ProfileDetails;