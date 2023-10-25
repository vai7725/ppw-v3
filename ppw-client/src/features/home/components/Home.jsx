import React, { Fragment, useEffect } from 'react';
import landingImg from '../../../assets/landing-img.webp';
import Main from './Main';
import UniversitySection from './UniversitySection';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';
import ogImg from '../../../assets/og-img.png';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Previous Year Question Papers</title>
        <meta
          name="description"
          content="Access question papers of different universities of Rajasthan easily. Boost your studies. Visit now!"
        />
        <link rel="canonical" href={`${window.origin}/`} />
        <meta
          name="keywords"
          content="previous year question papers , previous year papers , old papers , college old papers , rajasthan old papers , previous papers"
        />
        <meta
          property="og:title"
          content="Home | Previous Year Question Papers"
        />
        <meta
          property="og:description"
          content="Access question papers of different universities of Rajasthan easily. Boost your studies. Visit now!"
        />
        <meta property="og:image" content={ogImg} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_CLIENT_URI}/`}
        />
        <meta property="og:type" content={`article`} />
      </Helmet>
      <Main />
      <UniversitySection />
    </>
  );
};

export default Home;
