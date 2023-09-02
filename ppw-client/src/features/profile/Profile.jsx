import React from 'react';
import { useSelector } from 'react-redux';
import {
  EnvelopeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="w-[90%] relative my-20 py-4 m-auto px-2 sm:px-6 lg:px-8 border sm:w-fit flex justify-center items-center flex-col shadow-md rounded-md bg-indigo-50">
      <div className="w-24 h-24  rounded-full bg-purple-300 font-semibold text-center text-4xl flex justify-center items-center capitalize  top-[-3rem] absolute shadow-md">
        {user?.name[0]}
      </div>
      <div className="mt-10 text-center">
        <p className="text-xl">{user?.name}</p>
        <p className="text-sm text-gray-500">{user?.username}</p>
      </div>
      <div className="mt-7">
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <EnvelopeIcon className="h-6 w-6 mr-1" /> <span>{user?.email}</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <BriefcaseIcon className="h-6 w-6 mr-1" />{' '}
          <span>{user?.profession}</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <AcademicCapIcon className="h-6 w-6 mr-1" />{' '}
          <span>{user?.university}</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <BookOpenIcon className="h-6 w-6 mr-1" /> <span>{user?.course}</span>
        </div>
        <div className="border-solid border-t-2 border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <CheckBadgeIcon className="h-6 w-6 mr-1" /> <span>{user?.role}</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
