import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectOTPVerification = ({ children }) => {
  const { verificationSession } = useSelector((state) => state.auth);
  if (!verificationSession) {
    return <Navigate to={'/signup'} replace={true} />;
  }
  return children;
};

export default ProtectOTPVerification;
