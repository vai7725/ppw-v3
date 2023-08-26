import './App.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/papers/:university',
    element: <></>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
