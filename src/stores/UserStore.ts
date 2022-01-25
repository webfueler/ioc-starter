import { inject, injectable } from "inversify";
import { action, makeObservable, observable, runInAction } from "mobx";
import { IUser, IUserResponse } from "../interfaces/User";
import { TYPES } from "../ioc/types";
import { IUserService } from "../services/UserService";

export interface IUserStore {
    page: number;
    users: IUser[];
    loadUsersInPage: (page: number) => Promise<IUser[]>;
}

@injectable()
class UserStore implements IUserStore {
    @observable page = 1;
    @observable users: IUser[] = [];

    constructor(
        @inject(TYPES.userService) private readonly userService: IUserService
    ) {
        makeObservable(this);
    }

    @action
    loadUsersInPage(page: number): Promise<IUser[]> {
        this.page = page;

        return this.userService.fetchUsers(page)
            .then(action((response: IUser[] | IUserResponse | null) => {
                if (!response || !('results' in response)) {
                    return [];
                }

                this.users = response.results;
                return this.users;
            })).catch((e) => {
                console.log(e);
                return [];
            });
    }

    @action
    private setPage(value: number): void {
        this.page = value;
    }

    @action
    private setUsers(value: IUser[]): void {
        this.users = value;
    }
}

export { UserStore };
