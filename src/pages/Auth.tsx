import React from 'react';
import { Navigate } from 'react-router-dom';
import Spiner from 'react-bootstrap/Spinner';
import LoginForm from '../layouts/auth/LoginForm';
import RegisterForm from '../layouts/auth/RegisterForm';
import { useAuthContext } from '../services/contexts/AuthContext';

interface AuthProps {
  authRoute: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ authRoute }) => {
  const {
    authState: { loading, isAuthenticated },
  } = useAuthContext();

  if (loading) {
    return (
      <div className='d-flex justify-content-center mt-2'>
        <Spiner animation='border' variant='info' />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>Learn It</h1>
          <h4>Keep track of what you are learning</h4>
          {authRoute === 'login' && <LoginForm />}
          {authRoute === 'register' && <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
