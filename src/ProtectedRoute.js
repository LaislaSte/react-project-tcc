import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import { UserAuth } from './services/UserAuth';
import { CostumerContext } from './services/UserContext';

const ProtectedRoute = ({ children }) => {
  //   const { user } = UserAuth();
  const { user } = useContext(CostumerContext);

  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;