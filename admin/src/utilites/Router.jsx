import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Articles from '../pages/Articles';
import Users from '../pages/Users';
import All from '../sections/All';
import Published from '../sections/Published';
import NotPublished from '../sections/NotPublished';
import Create from '../pages/Create';
import { Navigate } from 'react-router-dom';

const token = localStorage.getItem('token');

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: !token ? <Navigate to={'/login'} /> : <App />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Dashboard /> },
        {
          path: '/articles',
          element: <Articles />,
          children: [
            { path: '/articles', element: <All /> },
            { path: '/articles/published', element: <Published /> },
            { path: '/articles/nonpublished', element: <NotPublished /> },
          ],
        },
        { path: 'create', element: <Create /> },
        { path: 'users', element: <Users /> },
        { path: '*', element: <ErrorPage /> },
      ],
    },
    {
      path: '/login',
      element: token ? <Navigate to={'/'} /> : <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
