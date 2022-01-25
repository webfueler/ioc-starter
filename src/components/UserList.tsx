import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInjection } from '../ioc/hooks/useInjection';
import { TYPES } from '../ioc/types';
import { IUserStore } from '../../src/stores/UserStore';
import { observer } from 'mobx-react';
import { IUserRoutesService } from '../services/UserRoutesService/interfaces';

const UserList: React.FC = observer(() => {
    const { page: routePage } = useParams();
    const page = Number.parseInt(routePage || '1', 10);

    const userStore = useInjection<IUserStore>(TYPES.userStore);
    const userRoutesService = useInjection<IUserRoutesService>(TYPES.userRoutesService);

    const { users } = userStore;

    const onPageChange = (): void => {
        userStore.loadUsers({ page }).catch((error) => console.log(error));
    };

    useEffect(onPageChange, [page, userStore]);

    return (
        <div>
            { users && (
                <ul>
                    { users.map((user) => (
                        <li key={user.email}>
                            <Link to={`/user/${userRoutesService.createUserSlug({
                                page,
                                resultsPerPage: 10,
                                email: user.email
                            })}`}>
                                { user.email }
                            </Link>
                        </li>
                    )) }
                </ul>
            ) }
            { page > 1 && <Link to={`/users/${page - 1}`}>Previous Page</Link> }
            { page }
            <Link to={`/users/${page + 1}`}>Next Page</Link>
        </div>
    );
});

export { UserList };
export default UserList;
