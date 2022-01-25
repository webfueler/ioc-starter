import { Container } from "inversify";
import { IUserService, UserService } from "../services/UserService";
import { UserServiceWithCache } from "../services/UserServiceWithCache";
import { IUserStore, UserStore } from "../stores/UserStore";
import { TYPES } from "./types";

const container = new Container({
    defaultScope: 'Singleton',
});

container.bind<IUserService>(TYPES.userService).to(UserServiceWithCache);
container.bind<IUserStore>(TYPES.userStore).to(UserStore);

export { container };
