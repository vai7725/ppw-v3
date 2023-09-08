import React from 'react';
import Slider from './Slider';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UniversitySection = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="py-20 sm:px-12 flex flex-col items-center justify-center ">
      <h2 className="hero-heading">Select Unniversity</h2>
      <Slider />
      {user && (user.role === 'ADMIN' || user.role === 'MANAGER') && (
        <Link to="/add-university" className="hero-btn w-fit px-2">
          Add university
        </Link>
      )}
    </section>
  );
};

export default UniversitySection;
