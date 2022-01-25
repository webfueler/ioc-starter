import { Container } from 'inversify';
import { TYPES } from './types';

import { UserService } from '../services/UserService/UserService';
import { UserServiceWithCache } from '../services/UserService/UserServiceWithCache';
import { IUserService } from '../services/UserService/interfaces';
import { UserStore, IUserStore } from '../stores/UserStore';
import { UserRoutesService } from '../services/UserRoutesService/UserRoutesService';
import type { IUserRoutesService } from '../services/UserRoutesService/interfaces';

const container = new Container({
    defaultScope: 'Singleton',
});

container.bind<IUserService>(TYPES.userService).to(UserService);
container.bind<IUserStore>(TYPES.userStore).to(UserStore);
container.bind<IUserRoutesService>(TYPES.userRoutesService).to(UserRoutesService);

export { container };
