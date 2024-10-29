import useAuth from '../../form/Authentication/useAuth';
import { useState } from 'react';
import './LogoutButton.css';
import axios from '../../form/Authentication/axios';

const LogoutButton = () => {
    const { auth, setAuth, setCurrentUser } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(true);
    };

    const hideModalHandler = () => {
        setShowModal(false);
    };

    const handleLogout = async() => {
        try {
            await axios.delete('/auth/revoke_access',
                {
                    headers: { 'Authorization': `Bearer ${auth?.token}` },
                }
            );
            await axios.delete('/auth/revoke_refresh',
                {
                    headers: { 'Authorization': `Bearer ${auth?.refresh_token}` },
                }
            );
            setAuth({});
            setCurrentUser({});
            console.log('logout was successful');
        } catch (error) {
            console.log('error logging out a user', error);
        }
    };

    return (
        <div className="logout-modal">
            <a href='#' onClick={showModalHandler}>Logout</a>

            {showModal && (
                <div className="overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Are you sure you want to logout?</h2>
                        </div>
                        <div className="modal-buttons">
                            <button className="cancel" onClick={hideModalHandler}>
                                Cancel
                            </button>
                            <button className="logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogoutButton;
