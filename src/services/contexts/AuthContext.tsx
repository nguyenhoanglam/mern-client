import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { apiUrl, LOCAL_STORAGE_KEY } from '../../config/constants';
import { authReducer, AuthState } from '../reducers/authReducer';
import { LoginForm, RegisterForm } from '../../types/auth';
import { setAuthToken } from '../../utils/api';

type AuthContextType = {
  authState: AuthState;
  loginUser: (loginForm: LoginForm) => Promise<any>;
  registerUser: (registerForm: RegisterForm) => Promise<any>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const initialState: AuthState = {
  loading: true,
  isAuthenticated: false,
  user: null,
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadUser();
  }, []);

  // Authenticate user
  async function loadUser() {
    const token = localStorage[LOCAL_STORAGE_KEY.ACCESS_TOKEN];
    if (token) {
      setAuthToken(token);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
    }
  }

  // Login user
  const loginUser = async (loginForm: LoginForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, response.data.accessToken);
        await loadUser();
      }

      return response.data;
    } catch (error: any) {
      return error?.response?.data ?? { success: false, message: 'Internal server error' };
    }
  };

  // Register new user
  const registerUser = async (registerForm: RegisterForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, registerForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, response.data.accessToken);
        await loadUser();
      }
    } catch (error: any) {
      return error?.response?.data ?? { success: false, message: 'Internal server error' };
    }
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
