import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState({});
  const [recentArticles, setRecentArticles] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getTopPicks() {}

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await fetch('http://localhost:3000/articles');

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        let responseData = await response.json();

        setArticles(responseData);
        setFeaturedArticle(responseData[0]);
        setRecentArticles([...responseData.slice(1, 5)]);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticles(null);
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  return (
    <div className='container mt-32 mx-auto mb-0 max-w-7xl'>
      <Header />
      {loading ? (
        <p className='h-screen'>Loading. . . </p>
      ) : (
        <Outlet
          context={{
            articles,
            featuredArticle,
            recentArticles,
            error,
          }}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
