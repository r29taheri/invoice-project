import { Action } from '@ngrx/store';

import { User } from '../../models/user';

export const REGISTER_USER = '[Auth] Register new user';
export const LOGIN_USER = '[Auth] Login user';
export const USER_INFO = '[Auth] Get user info';
export const UPDATE_USER = '[Auth] Update user info';
export const STORE_USERS = '[Auth] Save users to storage';
export const GET_USERS = '[Auth] Get users from storage';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: User) {}
}

export class LoginUser implements Action {
  readonly type = LOGIN_USER;
  constructor(public payload: User) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: { id: string, user: User }) {}
}

export class UserInfo implements Action {
  readonly type = USER_INFO;
  constructor(public payload: string) {}
}

export class GetUsers implements Action {
  readonly type = GET_USERS;
  constructor(public payload: User[]) {}
}

export class SaveUsers implements Action {
  readonly type = STORE_USERS;
  constructor() {}
}
export type AuthActions = RegisterUser | LoginUser | UserInfo | UpdateUser | GetUsers | SaveUsers;
