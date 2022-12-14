import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CostumerContext } from './services/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(CostumerContext);

  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;