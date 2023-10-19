import React from 'react';
import DefaultAvatar from '../../profile/DefaultAvatar';
import { useDispatch } from 'react-redux';
import { resolveContactQueryAsync } from '../dashboardSlice';

export default function ContactSection({ contacts }) {
  const dispatch = useDispatch();

  return (
    <div className=" w-full border-2 border-gray-300 p-2 rounded">
      <h2 className="text-xl">
        <span className="font-semibold">Contacts:</span>
        {contacts.length}
      </h2>
      <ul role="list" className="divide-y divide-gray-100 w-fit ">
        {contacts.map((contact) => (
          <li
            key={contact._id}
            className="flex items-start justify-start gap-x-6 py-5 px-2 w-fit sm:w-full  hover:bg-gray-200"
            title={contact.message}
          >
            <DefaultAvatar
              name={contact.name}
              classes={`w-12 h-12 text-lg font-semibold`}
            />
            <div className="flex flex-wrap justify-between w-[90%] min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto sm:w-3/4 ">
                <p className="text-sm font-semibold leading-6 text-gray-900 flex items-center ">
                  <span>{contact.name}</span>
                  <span className="ml-2 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {contact.university}
                  </span>
                </p>
                <p className="mt-1  text-sm leading-5 text-gray-500">
                  {contact.message.length > 100
                    ? `${contact.message.slice(0, 100)}...`
                    : contact.message}
                </p>
              </div>
              <div className=" shrink-0 sm:flex sm:flex-col sm:items-end border-t-2 border-gray-400 pr-4 sm:pr-0 sm:border-none">
                <p className="text-xs text-gray-500 leading-6 ">
                  {contact.createdAt}
                </p>
                {
                  <div className="mt-1 flex items-center  gap-x-1.5">
                    <button
                      onClick={() =>
                        dispatch(resolveContactQueryAsync(contact._id))
                      }
                      className="text-sm font-semibold bg-green-800 text-white px-2 py-[2px] rounded hover:bg-green-700"
                    >
                      Resolve
                    </button>
                  </div>
                }
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
