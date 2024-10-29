import { Outlet } from "react-router-dom";
import React from 'react';

/**
 * Functional component representing the layout of the authentication page.
 * Renders the main container with the nested routes using the Outlet component from react-router-dom.
 * @returns {JSX.Element} The layout component with nested routes.
 */
const Layout = () => {
  return (
    <main>
        <Outlet />
    </main>
  )
}

export default Layout
