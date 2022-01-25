import { action, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import {
    IFetchUsersResponse,
    IUser,
    IUserIdentifier,
    IUserService,
} from '../services/UserService/interfaces';
import { TYPES } from '../../src/ioc/types';

interface IUserStore {
    user: IUser | null;
    users: IUser[] | null;
    page: number;
    loadUsers: (params: IUserIdentifier) => Promise<IFetchUsersResponse>
    loadUser: (params: IUserIdentifier) => Promise<IUser | null>
}

@injectable()
class UserStore implements IUserStore {
    @observable user: IUser | null = null;
    @observable users: IUser[] = [];
    @observable page = 1;

    constructor(
        @inject(TYPES.userService) private readonly userService: IUserService
    ) {
        makeObservable(this);
    }

    @action
    loadUsers(params: IUserIdentifier): Promise<IUser[] | null> {
        if (params.email) {
            this.setUsers([]);
            return Promise.resolve(null);
        }

        this.setPage(params.page);

        return this.userService.fetchUsers(params).then((users) => {
            if (!users || Array.isArray(users)) {
                this.setUsers([]);
                return null;
            }
            this.setUsers(users.results);
            return users.results;
        });
    }

    @action
    loadUser(params: IUserIdentifier): Promise<IUser | null> {
        if (params.email === '') {
            this.setUser(null);
            return Promise.resolve(null);
        }

        this.setPage(params.page);

        return this.userService.fetchUsers(params).then((users) => {
            if (!users || !Array.isArray(users)) {
                this.setUser(null);
                return null;
            }
            this.setUser(users[0]);
            return users[0];
        });
    }

    @action
    setUser(user: IUser | null): void {
        this.user = user;
    }

    @action
    setUsers(users: IUser[]): void {
        this.users = users;
    }

    @action
    setPage(page: number): void {
        this.page = page;
    }
}

export { UserStore, IUserStore };
