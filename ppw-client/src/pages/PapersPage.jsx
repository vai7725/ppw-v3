import React from 'react';
import Navbar from '../features/navbar/Navbar';
import PapersSection from '../features/papers/components/PapersSection';

const PapersPage = () => {
  return (
    <Navbar>
      <PapersSection />
    </Navbar>
  );
};

export default PapersPage;
