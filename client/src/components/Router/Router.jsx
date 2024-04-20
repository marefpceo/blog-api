import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App/App';
import Home from '../Home/Home';
import Articles from '../Articles/Articles';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/articles', element: <Articles /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
