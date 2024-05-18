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
import { useEffect, useState } from 'react';
import { fetchUserAsync } from './features/auth/authSlice';
import EmailVerificationSuccess from './features/auth/components/EmailVerificationSuccess';
import ForgotPassword from './features/auth/components/ForgotPassword';
import ResetPassword from './features/auth/components/ResetPassword';
import ResetPasswordSuccess from './features/auth/components/ResetPasswordSuccess';
import AddUniversityPage from './pages/AddUniversityPage';
import EditUniversityPage from './pages/EditUniversityPage';
import AddPaperPage from './pages/AddPaperPage';
import AddCoursePage from './pages/AddCoursePage';
import DetailsPage from './pages/DetailsPage';
import EditCoursePage from './pages/EditCoursePage';
import EditPaperPage from './pages/EditPaperPage';
import API from './config/axiosInstance';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from 'react-hot-toast';
import ContributePage from './pages/ContributePage';
import Moved from './Moved';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Moved />,
  },
  // {
  //   path: '/papers/university/:universityId',
  //   element: <PapersPage />,
  // },
  // {
  //   path: '/about',
  //   element: <AboutPage />,
  // },
  // {
  //   path: '/contact',
  //   element: <ContactPage />,
  // },
  // {
  //   path: '/login',
  //   element: (
  //     <ProtectLogin>
  //       <Login />
  //     </ProtectLogin>
  //   ),
  // },
  // {
  //   path: '/forgot-password',
  //   element: (
  //     <ProtectLogin>
  //       <ForgotPassword />
  //     </ProtectLogin>
  //   ),
  // },
  // {
  //   path: '/reset-password/:resetToken',
  //   element: (
  //     <ProtectLogin>
  //       <ResetPassword />
  //     </ProtectLogin>
  //   ),
  // },
  // {
  //   path: '/signup',
  //   element: (
  //     <ProtectLogin>
  //       <Signup />
  //     </ProtectLogin>
  //   ),
  // },
  // {
  //   path: '/email-verification-success',
  //   element: <EmailVerificationSuccess />,
  // },
  // {
  //   path: '/reset-password-success',
  //   element: <ResetPasswordSuccess />,
  // },

  // {
  //   path: '/profile',
  //   element: (
  //     <ProtectToLogin>
  //       <ProfilePage />
  //     </ProtectToLogin>
  //   ),
  // },
  // {
  //   path: '/add-university',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN', 'MANAGER']}>
  //       <AddUniversityPage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/edit-university/:universityId',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN']}>
  //       <EditUniversityPage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/add-paper/:universityId',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN', 'MANAGER']}>
  //       <AddPaperPage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/edit-paper/:paperId',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN']}>
  //       <EditPaperPage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/add-course/:universityId',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN', 'MANAGER']}>
  //       <AddCoursePage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/edit-course/:courseId',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN']}>
  //       <EditCoursePage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/details/:universityId',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN', 'MANAGER']}>
  //       <DetailsPage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/dashboard',
  //   element: (
  //     <AuthorizeAccess role={['ADMIN']}>
  //       <DashboardPage />
  //     </AuthorizeAccess>
  //   ),
  // },
  // {
  //   path: '/contribute',
  //   element: <ContributePage />,
  // },
]);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const alreadyVisited = Boolean(localStorage.getItem('visitCredentials'));

  const updateUserVisit = async () => {
    const { data } = await API.put(`/general/visits`);
    if (data.success) {
      localStorage.setItem(
        'visitCredentials',
        JSON.stringify({ visited: true })
      );
    }
  };

  // useEffect(() => {
  //   dispatch(fetchUserAsync());
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   if (!alreadyVisited) {
  //     updateUserVisit();
  //   }
  // }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
