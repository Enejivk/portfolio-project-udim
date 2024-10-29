import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

/**
 * React component for a Google login button.
 * This component utilizes the useGoogleLogin hook to handle Google login functionality.
 * When the user successfully logs in, the access token is decoded using jwtDecode and the decoded token is logged to the console.
 * Clicking the button triggers the login function.
 * @returns {JSX.Element} A button component for signing up with Google.
 */
export const GoogleLoginBtn = () => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            const decodedToken = jwtDecode(tokenResponse.access_token);
            console.log(decodedToken);
        },
    });

    return (
        <button className="auth-icons" onClick={login} type='button'>
            <span>Sign Up with Google</span><FcGoogle />
        </button>
    ); 
}

