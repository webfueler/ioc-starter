import { injectable } from "inversify";
import { IUserResponse, IUser } from "../interfaces/User";

export interface IUserService {
    fetchUsers: (page: number,
        resultsPerPage?: number,
        email?: string) => Promise<IUserResponse | IUser[] | null>;
}

@injectable()
class UserServiceWithCache implements IUserService {
    private cache: Map<string, string> = new Map();

    fetchUsers = (
        page = 1,
        resultsPerPage = 10,
        email = ''
    ): Promise<IUserResponse | IUser[] | null> => {
        console.time('API response time');
        const url = `https://randomuser.me/api/?page=${page}&results=${resultsPerPage}&seed=inversifyjs`;
        if (this.cache.has(url)) {
            const users = JSON.parse(this.cache.get(url)!) as IUserResponse;
            console.timeEnd('API response time');
            return Promise.resolve(email !== ''
                ? users.results.filter((user) => user.email === email)
                : users);
        }

        const results = fetch(
            `https://randomuser.me/api/?page=${page}&results=${resultsPerPage}&seed=inversifyjs`
        )
            .then((response) => {
                console.timeEnd('API response time');
                return response.json();
            })
            .then((users: IUserResponse) => {
                this.cache.set(url, JSON.stringify(users));
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

export { UserServiceWithCache };
