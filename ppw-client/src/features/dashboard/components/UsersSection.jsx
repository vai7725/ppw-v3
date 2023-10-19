import DefaultAvatar from '../../profile/DefaultAvatar';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function UsersSection({ users }) {
  return (
    <div className=" w-full border-2 border-gray-300 p-2 rounded mb-4">
      <h2 className="text-xl">
        <span className="font-semibold">Total users:</span> {users.length}
      </h2>
      <ul role="list" className="divide-y divide-gray-100 w-fit ">
        {users.map((user) => (
          <li
            key={user.email}
            className="flex justify-between px-2 gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <DefaultAvatar
                name={user.name}
                classes={`w-12 h-12 text-lg font-semibold`}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 flex items-center ">
                  <span>{user.name}</span>

                  {user.isEmailVerified && (
                    <CheckBadgeIcon
                      className="w-5 h-5 ml-1 text-indigo-700 font-bold"
                      title="Verified"
                    />
                  )}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{user.username}</p>
              {
                <div className="mt-1 flex items-center gap-x-1.5">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {user.role}
                  </span>
                </div>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
