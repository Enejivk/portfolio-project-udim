import { useLocation, Outlet, Navigate } from "react-router-dom";
// import { useEffect } from "react";
import { useAuth } from "../../apiAndContext";
// import authService from '../../backend/auth';
import React from "react";

/**
 * Function component that handles authentication logic.
 * It checks if the user is authenticated by accessing the 'auth' object from the 'useAuth' hook.
 * If the user is authenticated (has a token), it renders the child components using <Outlet>.
 * If the user is not authenticated, it redirects to the login page with the current location stored in the state.
 * @returns {JSX.Element} Rendered component based on authentication status.
 */
const RequireAuth = () => {
  const { status } = useAuth();
  const location = useLocation();
  // console.log(status);

  return status ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth 