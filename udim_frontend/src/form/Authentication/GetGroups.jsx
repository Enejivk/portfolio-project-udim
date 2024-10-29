import React, { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

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
                isMounted && setGroups(response.data);
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
                        {groups.results.map((group) => <li key={group.id}>{group.name}</li>)}
                    </ul>
                ) : <p>No groups to display</p>
            }
        </article>
    );
};

export default Group;
