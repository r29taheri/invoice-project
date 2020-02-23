import { User } from '../../models/user';
import * as authActions from './auth.action';

export interface State {
  users: User[];
  user: User;
}

const initialState: State = {
    users: [
      new User('user-12345', 'test', 'test@gmail.com', '123456'),
    ],
    user: null
};


export function authReducer(state: State = initialState, action: authActions.AuthActions) {
  switch (action.type) {
      case authActions.LOGIN_USER:
        return {
          ...state
        };
      case authActions.REGISTER_USER:
        const isDuplicate = state.users.find(user => user.email === action.payload.email);
        const registerUser = isDuplicate ? [...state.users] : [...state.users, action.payload];
        return {
          ...state,
          users: registerUser
        };
      case authActions.UPDATE_USER:
        const userIndex = state.users.findIndex(user => user.id === action.payload.id);
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = action.payload.user;
        return {
          ...state,
          users: updatedUsers
        };
      case authActions.USER_INFO:
        return {
          ...state,
          user: state.users.find(user => {
            return user.id === action.payload;
          })
        };
      case authActions.GET_USERS:
        return {
          ...state,
          users: action.payload
        };
      case authActions.STORE_USERS:
        const users = JSON.stringify([...state.users]);
        localStorage.setItem('users', users);
        return {
          ...state
        };
      default:
        return state;
  }
}
