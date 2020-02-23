import { Client } from '../../../models/client';
import * as clientActions from './clients.action';

export interface State {
  clients: Client[];
  userClients: Client[];
  client: Client;
}

const initialState: State = {
  clients: [
    new Client('client-123128', 'user-12345', 'John Doe', '1 Client Address', 'USA', 'California', 'Alameda', 12345),
  ],
  userClients: new Array<Client>(),
  client: null
};


export function clientsReducer(state: State = initialState, action: clientActions.ClientActions) {
    switch (action.type) {
      case clientActions.ADD_CLIENT:
        const withNewClient = [...state.clients, action.payload];
        return {
          ...state,
          clients: withNewClient
        };
      case clientActions.USER_CLIENTS:
        return {
          ...state,
          userClients: state.clients.filter(client => {
            return client.userId === action.payload;
          })
        };
      case clientActions.UPDATE_CLIENT:
        const clientId = state.clients.findIndex(client => client.id === action.payload.id);
        const updatedClients = [...state.clients];
        updatedClients[clientId] = action.payload.client;
        return {
            ...state,
            clients: updatedClients
      };
      case clientActions.DELETE_CLIENT:
        return {
          ...state,
          clients: state.clients.filter(client => {
              return client.id !== action.payload;
          })
        };
      case clientActions.CLIENT_DETAIL:
        return {
          ...state,
          client: state.clients.find(client => {
              return client.id === action.payload;
          })
        };
      case clientActions.GET_CLIENTS:
        return {
          ...state,
          clients: action.payload
        };
      case clientActions.STORE_CLIENTS:
        const clients = JSON.stringify([...state.clients]);
        localStorage.setItem('clients', clients);
        return {
          ...state
        };
      default:
        return state;
    }
}
