import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App/App';
import Home from '../Home/Home';
import ArticleList from '../ArticleList/ArticleList';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/articles', element: <ArticleList /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
