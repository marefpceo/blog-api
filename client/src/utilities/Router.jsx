import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App';
import Home from '../pages/Home';
import ArticleList from '../pages/ArticleList';
import About from '../pages/About';
import Signup from '../pages/Signup';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';

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
        { path: '/login', element: <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
