import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PapersPage from './pages/PapersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './features/auth/components/Login';
import Signup from './features/auth/components/Signup';
import {
  ProtectToLogin,
  ProtectLogin,
  AuthorizeAccess,
} from './protectors/ProtectRoutes';
import ProfilePage from './pages/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserAsync } from './features/auth/authSlice';
import EmailVerificationSuccess from './features/auth/components/EmailVerificationSuccess';
import ForgotPassword from './features/auth/components/ForgotPassword';
import ResetPassword from './features/auth/components/ResetPassword';
import ResetPasswordSuccess from './features/auth/components/ResetPasswordSuccess';
import AddUniversity from './features/home/components/AddUniversity';
import AddUniversityPage from './pages/AddUniversityPage';
import EditUniversityPage from './pages/EditUniversityPage';

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
    path: '/email-verification-success',
    element: <EmailVerificationSuccess />,
  },
  {
    path: '/reset-password-success',
    element: <ResetPasswordSuccess />,
  },

  {
    path: '/profile',
    element: (
      <ProtectToLogin>
        <ProfilePage />
      </ProtectToLogin>
    ),
  },
  {
    path: '/add-university',
    element: (
      <AuthorizeAccess role={['ADMIN', 'MANAGER']}>
        <AddUniversityPage />
      </AuthorizeAccess>
    ),
  },
  {
    path: '/edit-university/:universityId',
    element: (
      <AuthorizeAccess role={['ADMIN']}>
        <EditUniversityPage />
      </AuthorizeAccess>
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
