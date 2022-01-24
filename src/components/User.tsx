import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IUser, IUserIdentifier } from '../interfaces/User';
import { fetchUsers } from '../api/fetchUsers';

const convertRouteToParams = (routeId?: string): IUserIdentifier | null => {
    if (!routeId) return null;

    try {
        const route = routeId.split('-');
        const [page, resultsPerPage, name] = route;
        return {
            page: Number.parseInt(page, 10),
            resultsPerPage: Number.parseInt(resultsPerPage, 10),
            name,
        };
    } catch (error) {
        return null;
    }
};

const User: React.FC = () => {
    const { id: routeId } = useParams();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const params = convertRouteToParams(routeId);
        if (!params) {
            return;
        }

        const { page, resultsPerPage, name } = params;
        fetchUsers(page, resultsPerPage, name)
            .then((users) => {
                if (users && Array.isArray(users)) {
                    setUser(users[0]);
                }
                return users;
            })
            .catch((error) => console.log(error));
    }, [routeId]);

    return (
        <>
            { user ? (
                <div>
                    <h3>
                        { user.name.title } { user.name.first } { user.name.last }
                    </h3>
                    <h5>{ user.email }</h5>
                    <img src={user.picture.medium} alt={user.name.first} />
                </div>
            ) : (
                <div>User not found</div>
            ) }
        </>
    );
};

export { User };
export default User;
