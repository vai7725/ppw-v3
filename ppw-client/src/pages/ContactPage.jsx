import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Contact from '../features/contact/Contact';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';

const ContactPage = () => {
  const { status } = useSelector((state) => state.auth);
  if (status === 'loading') {
    return <LoadingPage />;
  }
  return (
    <Navbar>
      <Contact />
    </Navbar>
  );
};

export default ContactPage;
