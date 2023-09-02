import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PapersPage from './pages/PapersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './features/auth/components/Login';
import Signup from './features/auth/components/Signup';
import VerifyOTP from './features/auth/components/VerifyOTP';
import RegisterCreds from './features/auth/components/RegisterCreds';
import ProtectOTPVerification from '../protectors/ProtectVerificatoionSession';
import ProfilePage from './pages/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserAsync } from './features/auth/authSlice';

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
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/verify-otp',
    element: (
      <ProtectOTPVerification>
        <VerifyOTP />
      </ProtectOTPVerification>
    ),
  },
  {
    path: '/register-creds',
    element: <RegisterCreds />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
