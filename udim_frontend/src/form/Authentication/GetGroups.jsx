import React, { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Component for displaying a list of groups fetched from the server.
 * Uses Axios for API requests and React Router for navigation.
 * Manages component lifecycle to handle asynchronous data fetching and updates.
 */
const Group = () => {
    const [groups, setGroups] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getGroups = async () => {
            try {
                const response = await axiosPrivate.get('/api/groups', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setGroups(response.data.groups);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };

        getGroups();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate, navigate, location]);

    return (
        <article>
            <h2>Groups List</h2>
            {groups?.results?.length
                ? (
                    <ul>
                        {groups.results.map((group, i) => <li key={i}>{group.name}</li>)}
                    </ul>
                ) : <p>No groups to display</p>
            }
        </article>
    );
};

export default Group;
