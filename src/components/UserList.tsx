import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TYPES } from '../ioc/types';
import type { IUserStore } from '../stores/UserStore';
import { injectableProvider } from '../ioc/provider/injectableProvider';

type Props = {
    userStore: IUserStore
}

const UserListComponent: React.FC<Props> = ({ userStore }) => {
    const { page: routePage } = useParams();
    const page = Number.parseInt(routePage || '1', 10);

    const { users } = userStore;

    const onPageChange = (): void => {
        userStore.loadUsersInPage(page).catch(e => console.log(e));
    }

    useEffect(onPageChange, [page, userStore]);

    return (
        <div>
            { users && (
                <ul>
                    { users.map((user) => (
                        <li key={user.email}>
                            <Link to={`/user/${page}-10-${user.email}`}>
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
};

const UserList = injectableProvider<Props>({
    userStore: TYPES.userStore
})(UserListComponent);

export { UserList };
export default UserList;
