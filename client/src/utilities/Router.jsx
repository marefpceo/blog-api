import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App';
import Home from '../pages/Home';
import ArticleList from '../pages/ArticleList';
import About from '../pages/About';
import Signup from '../pages/Signup';
import ErrorPage from '../pages/ErrorPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/articles', element: <ArticleList /> },
        { path: '/about', element: <About /> },
        { path: '/signup', element: <Signup /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
