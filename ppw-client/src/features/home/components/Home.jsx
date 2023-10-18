import React, { Fragment, useEffect } from 'react';
import landingImg from '../../../assets/landing-img.webp';
import Main from './Main';
import UniversitySection from './UniversitySection';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  return (
    <>
      <Toaster />
      <Main />
      <UniversitySection />
    </>
  );
};

export default Home;
