import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../pages/App/App';
import Home from '../pages/Home';
import ArticleList from '../pages/ArticleList';
import About from '../pages/About';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/articles', element: <ArticleList /> },
        { path: '/about', element: <About /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
