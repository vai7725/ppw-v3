import React from 'react';
import Navbar from '../features/navbar/Navbar';
import PapersSection from '../features/papers/components/PapersSection';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';

const PapersPage = () => {
  const { status } = useSelector((state) => state.auth);
  if (status === 'loading') {
    return <LoadingPage />;
  }
  return (
    <Navbar>
      <PapersSection />
    </Navbar>
  );
};

export default PapersPage;
