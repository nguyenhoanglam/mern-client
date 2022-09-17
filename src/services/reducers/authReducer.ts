import { User } from '../../types/user';

type AuthActionType = 'SET_AUTH';

export interface AuthAction {
  type: AuthActionType;
  payload: { isAuthenticated: boolean; user: User | null };
}

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export const authReducer = (state: AuthState, action: AuthAction) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        loading: false,
        isAuthenticated,
        user,
      };
    default:
      return state;
  }
};
