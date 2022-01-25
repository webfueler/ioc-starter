import { injectable } from 'inversify';
import { IUserIdentifier, IUserResponse, IUserService } from './interfaces';
import type { IFetchUsersResponse } from './interfaces';

@injectable()
class UserService implements IUserService {
    fetchUsers = ({
        page = 1,
        resultsPerPage = 10,
        email = '',
    }: IUserIdentifier): Promise<IFetchUsersResponse> => {
        console.time('API response time');
        const results = fetch(
            `https://randomuser.me/api/?page=${page}&results=${resultsPerPage}&seed=inversifyjs`
        )
            .then((response) => {
                console.timeEnd('API response time');
                return response.json();
            })
            .then((users: IUserResponse) => {
                return email !== ''
                    ? users.results.filter((user) => user.email === email)
                    : users;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });

        return results;
    };
}

export { UserService };
