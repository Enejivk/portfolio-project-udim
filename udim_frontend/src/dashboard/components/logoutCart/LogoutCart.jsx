// LogoutPage.js

import React from 'react';
import './LogoutCart.css';
import LogoutButton from '../../../landingPage/logoutButton/LogoutButton'
// import {userLogin} from '../allIcon'
import useAuth from '../../../form/Authentication/useAuth';

const LogoutPage = () => {
    // const [toggle, setToggle] = React.useState(false);
    const {currentUser} = useAuth();
    // const toggleEditForm = () => {
    //     setToggle(!toggle);
    // };
    
    return (
        <div className="logout-container">
            <div className="profile-picture">
                <img src={currentUser.image_url} alt={currentUser.first_name} />
            </div>
            <h1>Goodbye, {currentUser.first_name}!</h1>
            <p>We hope to see you again soon!</p>
            <LogoutButton />
        </div>
    );
};

export default LogoutPage;
