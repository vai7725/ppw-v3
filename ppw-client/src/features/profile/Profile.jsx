import React from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '../../pages/LoadingPage';
import {
  EnvelopeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  return (
    <section className="w-[90%] relative my-20 py-4 m-auto px-2 sm:px-6 lg:px-8 border sm:w-fit flex justify-center items-center flex-col shadow-md rounded-md bg-indigo-50">
      <div className="w-24 h-24  rounded-full bg-purple-300 font-semibold text-center text-4xl flex justify-center items-center capitalize  top-[-3rem] absolute shadow-md">
        V
      </div>
      <div className="mt-10 text-center">
        <p className="text-xl">Vaibhav Prajapat</p>
        <p className="text-sm text-gray-500">vaibhav@admin</p>
      </div>
      <div className="mt-7">
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <EnvelopeIcon className="h-6 w-6 mr-1" />{' '}
          <span>vaibhav.prajapat.7725@gmail.com</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <BriefcaseIcon className="h-6 w-6 mr-1" /> <span>Student</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <AcademicCapIcon className="h-6 w-6 mr-1" /> <span>MDSU</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <BookOpenIcon className="h-6 w-6 mr-1" /> <span>B.Sc B.Ed</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <KeyIcon className="h-6 w-6 mr-1" /> <span>User</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
