import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Profile from '../features/profile/Profile';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';

const ProfilePage = () => {
  const { status } = useSelector((state) => state.auth);
  if (status === 'loading') {
    return <LoadingPage />;
  }
  return (
    <Navbar>
      <Profile />
    </Navbar>
  );
};

export default ProfilePage;
