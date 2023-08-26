import React from 'react';
import logo from '../../../assets/logo.webp';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-800 flex flex-col items-start sm:flex-row sm:items-center justify-around sm:border-none w-full py-4 px-4 text-white ">
      <header className="flex items-center max-w-[400px]  my-3 py-3 border-solid border-b-2 border-white sm:border-none">
        <img className="h-8 w-auto" src={logo} alt="Your Company" />
        <h3 className="ml-3 font-semibold text-xl">Previous Papers</h3>
      </header>
      <div>
        <div className="flex items-center py-3 max-w-[400px] border-solid border-b-2 border-white sm:border-none">
          <EnvelopeIcon className="h-6 w-6 " />
          <p className="ml-2">previouspapers2023@gmail.com</p>
        </div>
        <p className="py-3 text-sm ">
          &copy; 2023 previouspapers.netlify.app, All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
