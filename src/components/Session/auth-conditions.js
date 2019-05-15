import {ROLES} from '../../_constants';

export const isUser = (authUser) => !!authUser;
export const isAdmin = (authUser) => authUser && authUser.roles &&
    authUser.roles[ROLES.ADMIN] === ROLES.ADMIN;
