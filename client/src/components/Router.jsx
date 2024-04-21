import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App/App';
import Home from '../pages/Home';
import ArticleList from '../pages/ArticleList';

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
