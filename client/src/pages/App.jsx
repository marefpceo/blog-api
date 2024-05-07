import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState({});
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await fetch('http://localhost:3000/articles');

        if (!response.ok) {
          const error = new Error();
          if (response.status === 500) {
            error.message = 'Internal Server Error';
            error.status = 500;
            throw error;
          }
          if (response.status === 404) {
            error.message = 'Page Not Found';
            error.status = 404;
            throw error;
          }
          throw new Error(response.status);
        } else {
          let responseData = await response.json();

          setArticles(responseData);
          setFeaturedArticle(responseData[0]);
          setRecentArticles([...responseData.slice(1, 5)]);
          setError(null);
        }
      } catch (error) {
        console.error(error, error.status);
        setArticles(null);
        return navigate('*', {
          state: { status: error.status, statusMessage: error.message },
        });
      } finally {
        setTimeout(setLoading(false), 3000);
      }
    }
    getArticles();
  }, []);

  return (
    <div className='container mx-auto mb-0 mt-32 flex flex-1 flex-col'>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      {loading ? (
        <p className='h-screen'>Loading. . . </p>
      ) : (
        <Outlet
          context={{
            articles,
            featuredArticle,
            recentArticles,
            isAuthenticated,
            setIsAuthenticated,
          }}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
