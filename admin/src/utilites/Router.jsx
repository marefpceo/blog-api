import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Articles from '../pages/Articles';
import Users from '../pages/Users';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
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
