import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IUser } from '../interfaces/User';
import { fetchUsers } from '../api/fetchUsers';

const UserList = (): JSX.Element => {
    const [users, setUsers] = useState<IUser[]>([]);

    const { page: routePage } = useParams();
    const page = Number.parseInt(routePage || '1', 10);

    useEffect(() => {
        fetchUsers(page)
            .then((users) => {
                if (users && 'results' in users) {
                    setUsers(users.results);
                }
                return users;
            })
            .catch((error) => error);
    }, [page]);

    return (
        <div>
            {users && (
                <ul>
                    {users.map((user) => (
                        <li key={user.email}>
                            <Link to={`/user/${page}-10-${user.email}`}>
                                {user.email}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {page > 1 && <Link to={`/users/${page - 1}`}>Previous Page</Link>}
            {page}
            <Link to={`/users/${page + 1}`}>Next Page</Link>
        </div>
    );
};

export { UserList };
export default UserList;
