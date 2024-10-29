import {useAuth} from '../../apiAndContext';
import { useState } from 'react';
import './LogoutButton.css';
import authService from '../../backend/auth';

const LogoutButton = () => {
    const { logout } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const showModalHandler = () => {
        setShowModal(true);
    };

    const hideModalHandler = () => {
        setShowModal(false);
    };

    const handleLogout = async() => {
        await authService.logout();
        logout();
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
