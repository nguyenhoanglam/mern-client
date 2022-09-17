import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useAuthContext } from '../../services/contexts/AuthContext';
import NavBar from '../../components/NavBar';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login', children }) => {
  const {
    authState: { loading, isAuthenticated },
  } = useAuthContext();

  if (loading) {
    return (
      <div className='spiner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <NavBar />
      {children ?? <Outlet />}
    </>
  );
};

export default ProtectedRoute;
