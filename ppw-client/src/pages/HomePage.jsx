import Navbar from '../features/navbar/Navbar';
import Home from '../features/home/components/Home';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';

import React from 'react';

const HomePage = () => {
  const { status } = useSelector((state) => state.auth);
  if (status === 'loading') {
    return <LoadingPage />;
  }

  return (
    <Navbar>
      <Home />
    </Navbar>
  );
};

export default HomePage;
