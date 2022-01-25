import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TYPES } from '../../src/ioc/types';
import { IUserStore } from '../../src/stores/UserStore';
import { injectableProvider } from '../../src/ioc/providers/injectableProvider';
import { IUserRoutesService } from '../services/UserRoutesService/interfaces';

type Props = {
    userStore: IUserStore;
    userRoutesService: IUserRoutesService;
}

const UserComponent: React.FC<Props> = ({ userStore, userRoutesService }) => {
    const { id: routeId } = useParams();
    const  { user } = userStore;

    const onUserChange = (): void => {
        const params = userRoutesService.getUserFromSlug(routeId || '');
        if (!params) {
            return;
        }
        userStore.loadUser(params).catch((error) => console.log(error));
    };

    useEffect(onUserChange, [routeId, userStore, userRoutesService]);

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
    userStore: TYPES.userStore,
    userRoutesService: TYPES.userRoutesService
 })(UserComponent);

export { User, UserComponent };
export default User;
