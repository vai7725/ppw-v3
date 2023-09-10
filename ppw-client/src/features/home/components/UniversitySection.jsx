import React from 'react';
import UniversityCard from './UniversityCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const UniversitySection = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="py-20 sm:px-12 flex flex-col items-center justify-center ">
      <h2 className="hero-heading">Select Unniversity</h2>
      <UniversityCard />
      {user && (user.role === 'ADMIN' || user.role === 'MANAGER') && (
        <Link
          to="/add-university"
          className="hero-btn w-fit px-2 flex items-center justify-center text-center"
        >
          <PlusCircleIcon className="w-6 h-6 mr-1" />
          Add university
        </Link>
      )}
    </section>
  );
};

export default UniversitySection;
