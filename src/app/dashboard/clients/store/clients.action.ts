import { Action } from '@ngrx/store';

import { Client } from '../../../models/client';

export const ADD_CLIENT = '[Client] Add new client';
export const USER_CLIENTS = '[Client] Get user\'s clients';
export const UPDATE_CLIENT = '[Client] Edit client';
export const DELETE_CLIENT = '[Client] Delete client';
export const CLIENT_DETAIL = '[Client] Get client detail';
export const STORE_CLIENTS = '[Client] Save clients to storage';
export const GET_CLIENTS = '[Client] Get client from storage';

export class AddClient implements Action {
  readonly type = ADD_CLIENT;
  constructor(public payload: Client) {}
}

export class UserClients implements Action {
  readonly type = USER_CLIENTS;
  constructor(public payload: string) {}
}

export class UpdateClient implements Action {
  readonly type = UPDATE_CLIENT;
  constructor(public payload: { id: string, client: Client }) {}
}

export class DeleteClient implements Action {
  readonly type = DELETE_CLIENT;
  constructor(public payload: string) {}
}

export class ClientDetail implements Action {
  readonly type = CLIENT_DETAIL;
  constructor(public payload: string) {}
}

export class GetClients implements Action {
  readonly type = GET_CLIENTS;
  constructor(public payload: Client[]) {}
}

export class SaveClients implements Action {
  readonly type = STORE_CLIENTS;
  constructor() {}
}

export type ClientActions = AddClient | UserClients | UpdateClient | DeleteClient | ClientDetail | GetClients | SaveClients;
