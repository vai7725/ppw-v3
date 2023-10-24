import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.webp';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAsync } from '../auth/authSlice';
import Footer from '../home/components/Footer';
import DefaultAvatar from '../profile/DefaultAvatar';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
  { name: 'Contribute', href: '/contribute', current: false },
];

const securedNavigation = [
  { name: 'Dashboard', href: '/dashboard', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className=" flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link to={'/'} className="flex flex-shrink-0 items-center">
                    <img className="h-8 w-auto" src={logo} alt="Your Company" />
                  </Link>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {(user?.role == 'ADMIN' || user?.role == 'MANAGER') &&
                        securedNavigation.map((item) => {
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                location.pathname === item.href
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {user ? (
                        <Menu.Button className="relative flex rounded-full bg-gray-800  active:outline-none active:ring-2 ring-offset-2 active:ring-offset-gray-800 ">
                          <span className="absolute -inset-1.5" />
                          <DefaultAvatar
                            name={user?.name}
                            classes={`w-8 h-8 text-lg`}
                          />
                        </Menu.Button>
                      ) : (
                        <Link
                          to={'/login'}
                          className="hero-btn border border-white px-3 py-1 text-sm font-semibold"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              onClick={() => dispatch(logoutUserAsync())}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                              )}
                            >
                              Log out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    as="a"
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
                {(user?.role === 'ADMIN' || user?.role === 'MANAGER') &&
                  securedNavigation.map((item) => {
                    return (
                      <Link
                        key={item.name}
                        as="a"
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main className="mx-auto w-full">{children}</main>
      <Footer />
    </>
  );
}
