import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  clearState,
  fetchContactsAsync,
  fetchUsersDataAsync,
} from '../dashboardSlice';
import UsersSection from './UsersSection';
import ContactSection from './ContactSection';

export default function Dashboard() {
  const dispatch = useDispatch();

  const { users, contacts } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchUsersDataAsync());
    dispatch(fetchContactsAsync());

    return () => {
      dispatch(clearState());
    };
  }, []);

  return (
    <section className="max-w-7xl sm:px-9 m-auto flex flex-col  items-center px-6 py-12 bg-gray-100 sm:bg-white sm:border-b-2 sm:border-gray-300 min-h-screen">
      <UsersSection users={users} />
      <ContactSection contacts={contacts} />
    </section>
  );
}
