import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectOTPVerification = ({ children }) => {
  const { verificationSession } = useSelector((state) => state.auth);
  if (!verificationSession) {
    return <Navigate to={'/signup'} replace={true} />;
  }
  return children;
};

export const ProtectProfilePage = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }
  return children;
};
