import React from 'react';
import DefaultAvatar from '../../profile/DefaultAvatar';
import { useDispatch, useSelector } from 'react-redux';
import {
  resolveContactQueryAsync,
  handleContactSpecificLoader,
} from '../dashboardSlice';
import { LoaderIcon } from 'react-hot-toast';
import Loader from '../../contribute/components/Loader';
import { LinkIcon } from '@heroicons/react/24/outline';

export default function ContactSection({ contacts }) {
  const dispatch = useDispatch();

  const { loadStatus, status } = useSelector((state) => state.dashboard);

  return (
    <div className=" w-full border-2 border-gray-300 p-2 rounded">
      <h2 className="text-xl">
        <span className="font-semibold">Contacts:</span>
        {contacts.length}
      </h2>
      {status === 'loading' ? (
        <div className="w-full flex items-center justify-center p-2">
          <LoaderIcon />
        </div>
      ) : (
        <div className="bg-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white p-4 rounded shadow-md flex flex-col justify-between items-start"
              >
                <div>
                  <DefaultAvatar
                    classes={`w-12 h-12 text-2xl mb-4`}
                    name={contact.name}
                  />
                  <h2 className="text-xl font-semibold">
                    {contact.name}
                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 ml-2">
                      {contact.university}
                    </span>
                  </h2>
                  <p className="text-gray-600 text-xs">{contact.email}</p>
                  <p className="text-gray-600">{contact.message}</p>
                </div>
                <div className="flex items-center justify-end w-full">
                  <button
                    onClick={() => {
                      dispatch(handleContactSpecificLoader(contact._id));
                      dispatch(resolveContactQueryAsync(contact._id));
                    }}
                    className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 "
                  >
                    {contact.status === 'loading' ? <Loader /> : 'Resolve'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
