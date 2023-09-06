import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PapersPage from './pages/PapersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './features/auth/components/Login';
import Signup from './features/auth/components/Signup';
import { ProtectToLogin, ProtectLogin } from './protectors/ProtectRoutes';
import ProfilePage from './pages/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserAsync } from './features/auth/authSlice';
import SuccessPage from './features/auth/components/SuccessPage';
import ForgotPassword from './features/auth/components/ForgotPassword';
import ResetPassword from './features/auth/components/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/papers/university/:universityId',
    element: <PapersPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/login',
    element: (
      <ProtectLogin>
        <Login />
      </ProtectLogin>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectLogin>
        <ForgotPassword />
      </ProtectLogin>
    ),
  },
  {
    path: '/reset-password/:resetToken',
    element: (
      <ProtectLogin>
        <ResetPassword />
      </ProtectLogin>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectLogin>
        <Signup />
      </ProtectLogin>
    ),
  },
  {
    path: '/success',
    element: <SuccessPage />,
  },

  {
    path: '/profile',
    element: (
      <ProtectToLogin>
        <ProfilePage />
      </ProtectToLogin>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [isAuthenticated]);
  return <RouterProvider router={router} />;
}

export default App;
