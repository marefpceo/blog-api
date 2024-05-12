import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Articles from '../pages/Articles';
import Users from '../pages/Users';

const token = localStorage.getItem('token');

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: !token ? <Login /> : <App />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: 'articles', element: <Articles /> },
        { path: 'users', element: <Users /> },
        { path: '*', element: <ErrorPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
