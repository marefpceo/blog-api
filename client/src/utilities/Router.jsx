import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App';
import Home from '../pages/Home';
import ArticleList from '../pages/ArticleList';
import About from '../pages/About';
import Signup from '../pages/Signup';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Article from '../pages/Article';
import Comments from '../pages/Comments';
import ArticleSection from '../features/ArticleSection';
import LeaveComment from '../features/LeaveComment';

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
        {
          path: '/article/:id',
          element: <Article />,
          children: [
            { path: '/article/:id', element: <ArticleSection /> },
            { path: 'comments', element: <Comments /> },
            { path: 'leave_comment', element: <LeaveComment /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
