import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';

export const ProtectLogin = ({ children }) => {
  const { user, status } = useSelector((state) => state.auth);

  if (status === 'loading') {
    return <LoadingPage />;
  }

  if (user) {
    return <Navigate to={'/'} replace={true} />;
  }
  return children;
};

export const ProtectToLogin = ({ children }) => {
  const { user, status } = useSelector((state) => state.auth);

  if (status === 'loading') {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }
  return children;
};
