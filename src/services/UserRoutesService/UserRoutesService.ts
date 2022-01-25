import { injectable } from "inversify";
import { IUserIdentifier } from "../UserService/interfaces";
import { IUserRoutesService } from "./interfaces";

@injectable()
class UserRoutesService implements IUserRoutesService {
    getUserFromSlug(slug: string): IUserIdentifier | null {
        if (!slug) return null;

        try {
            const route = slug.split('-');
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

    createUserSlug(user: IUserIdentifier): string {
        if (!user.resultsPerPage || !user.email) {
            throw new Error('invalid user identifier');
        }
        return `${user.page}-${user.resultsPerPage}-${user.email}`;
    }
}

export { UserRoutesService };
