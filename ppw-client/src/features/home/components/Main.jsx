import React from 'react';
import landingImg from '../../../assets/landing-img.webp';

const Main = () => {
  return (
    <section className="max-w-7xl sm:px-9 m-auto flex flex-col-reverse sm:flex-row items-center justify-between py-12 bg-gray-100 sm:bg-white sm:border-b-2 sm:border-gray-300">
      <h1 className="hero-heading">
        Download and <span className="text-black ">prepare</span> <br /> for
        your exam
      </h1>
      <img src={landingImg} alt="" className="w-[80%] sm:w-[40%]" />
    </section>
  );
};
export default Main;
