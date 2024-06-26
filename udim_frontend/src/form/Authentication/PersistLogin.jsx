// PersistLogin.jsx
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [auth, refresh]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.token)}`)
    }, [isLoading, auth?.token])

    return (
        <>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;
