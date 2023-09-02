import React from 'react';
import Navbar from '../features/navbar/Navbar';
import About from '../features/about/About';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';

const AboutPage = () => {
  const { status } = useSelector((state) => state.auth);
  if (status === 'loading') {
    return <LoadingPage />;
  }
  return (
    <Navbar>
      <About />
    </Navbar>
  );
};

export default AboutPage;
