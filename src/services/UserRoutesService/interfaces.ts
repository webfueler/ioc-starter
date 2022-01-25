import { IUserIdentifier } from "../UserService/interfaces";

export interface IUserRoutesService {
    createUserSlug: (user: IUserIdentifier) => string;
    getUserFromSlug: (slug: string) => IUserIdentifier | null;
}
