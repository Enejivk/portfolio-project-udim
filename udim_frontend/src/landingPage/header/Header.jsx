import './Header.css'
import { FiAlignJustify } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import useAuth from '../../form/Authentication/useAuth';
import LogoutButton from '../logoutButton/LogoutButton'

import logoBlack from '../../assets/logoBlack.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
    <>
        <p><Link to='/home'>Home</Link></p>
        <p><a href="#about-section">About</a></p>
        <p><a href="#benefit-section">Benefit</a></p>
        <p><a href="#feature">Features</a></p>
    </>
)

const SignUp = () => {
    const { auth, setAuth } = useAuth();
    {
        console.log('from header period', auth)
    }
    return (
        <>
            {auth.token ? (
                <>
                    <p className='nav-sign-up'>
                        <LogoutButton />
                    </p>
                </>
            ) : (
                <>
                    <p className='nav-sign-up'>
                        <Link to='/signUp'>Sign up</Link>
                    </p>
                    <p>
                        <Link to='/login'>Sign In</Link>
                    </p>
                </>
            )}
        </>
    );
};
const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <nav className='nav-bar-container'>
            <div className='nav-logo'>
                <img src={logoBlack} alt="logo" />
            </div>
            <div className='nav-menu-links'>
                <Menu />
            </div>
            <div className='nav-signUp_sign_in'>
                <SignUp />
            </div>

            {/* NAV BAR FOR TABLE AND MOBILE SCREEN */}
            <div className="menu-link-small-screen">
                <FiAlignJustify fontSize={37} onClick={() => { setToggleMenu(!toggleMenu) }} />

                {toggleMenu &&
                    <div className='nav-menu-links-small-screen'>
                        <FiX color='#fff' fontSize={37} onClick={() => { setToggleMenu(!toggleMenu) }} />
                        <Menu />
                        <SignUp />
                    </div>
                }

            </div>
        </nav>
    )
}

export default Header
