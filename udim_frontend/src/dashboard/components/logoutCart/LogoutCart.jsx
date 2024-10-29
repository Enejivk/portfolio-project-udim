// LogoutPage.js

import React from 'react';
import './LogoutCart.css';
import LogoutButton from '../../../landingPage/logoutButton/LogoutButton'
import {useAuth} from '../../../apiAndContext';

const LogoutPage = () => {
    // const [toggle, setToggle] = React.useState(false);
    const { userData } = useAuth();
    // const toggleEditForm = () => {
    //     setToggle(!toggle);
    // };
    
    return (
        <div className="logout-container">
            <div className="profile-picture">
                <img src={userData.image_url} alt={userData.first_name} />
            </div>
            <h1>Goodbye, {userData.first_name}!</h1>
            <p>We hope to see you again soon!</p>
            <LogoutButton />
        </div>
    );
};

export default LogoutPage;
