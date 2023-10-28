import React from 'react';
import { useSelector } from 'react-redux';
import {
  EnvelopeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import DefaultAvatar from './DefaultAvatar';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="w-[90%] min-w-[300px] relative my-20 py-4 m-auto px-2 sm:px-6 lg:px-8 border sm:w-fit flex justify-center items-center flex-col shadow-md rounded-md bg-indigo-50">
      <DefaultAvatar
        name={user.name}
        classes={`w-24 h-24 text-4xl shadow-lg`}
      />
      <div className="mt-2 text-center">
        <p className="text-xl flex items-center justify-center">
          {user?.name}
          {user?.isEmailVerified && (
            <CheckBadgeIcon
              className="h-5 w-5 ml-1 text-indigo-500"
              title="Email is verified"
            />
          )}
        </p>
        <p className="text-sm text-gray-500">
          <span className="text-gray-800 font-semibold">Username</span> -{' '}
          {user?.username}
        </p>
      </div>
      <div className="mt-7">
        <div className="border-solid border-t-2 min-w-[290px] border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <EnvelopeIcon className="h-6 w-6 mr-1" /> <span>{user?.email}</span>
        </div>
        <div className="border-solid border-t-2 min-w-[290px] border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <BriefcaseIcon className="h-6 w-6 mr-1" />{' '}
          <span>{user?.profession}</span>
        </div>
        <div className="border-solid border-t-2 min-w-[290px] border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <AcademicCapIcon className="h-6 w-6 mr-1" />{' '}
          <span>{user?.university || 'Not defined'}</span>
        </div>
        <div className="border-solid border-t-2 min-w-[290px] border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <BookOpenIcon className="h-6 w-6 mr-1" />{' '}
          <span>{user?.course || 'Not defined'}</span>
        </div>
        <div className="border-solid border-t-2 min-w-[290px] border-gray-300 w-full py-3 px-1 flex items-center justify-start text-gray-500">
          <StarIcon className="h-6 w-6 mr-1" />{' '}
          <span>{user?.contribution_points} contribution points</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
