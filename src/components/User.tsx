import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { IUser, IUserIdentifier } from '../interfaces/User';
import { IUserService } from '../services/UserService';
import { injectableProvider } from '../ioc/provider/injectableProvider';
import { TYPES } from '../ioc/types';

const convertRouteToParams = (routeId?: string): IUserIdentifier | null => {
    if (!routeId) return null;

    try {
        const route = routeId.split('-');
        const [page, resultsPerPage, email] = route;
        return {
            page: Number.parseInt(page, 10),
            resultsPerPage: Number.parseInt(resultsPerPage, 10),
            email,
        };
    } catch (error) {
        return null;
    }
};

type Props = {
    userService: IUserService;
}

const UserComponent: React.FC<Props> = ({ userService }) => {
    const { id: routeId } = useParams();
    const [user, setUser] = useState<IUser | null>(null);

    const onUserChange = (): void => {
        const params = convertRouteToParams(routeId);
        if (!params) {
            return;
        }

        const { page, resultsPerPage, email } = params;
        userService.fetchUsers(page, resultsPerPage, email)
            .then((users) => {
                if (users && Array.isArray(users)) {
                    setUser(users[0]);
                }
                return users;
            })
            .catch((error) => console.log(error));
    };

    useEffect(onUserChange, [routeId, userService]);

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

const User = injectableProvider({
    userService: TYPES.userService
})(UserComponent);

export { User };
export default User;
