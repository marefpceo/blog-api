import { useEffect, useState } from 'react';
import './App.css';
import Header from '../../components/Header';
import Featured from '../../features/Featured';
import Subsection from '../../features/Subsection';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticles(null);
      } finally {
        setLoading(false);
        console.log(articles);
        console.log(featuredArticle);
      }
    }
    getArticles();
  }, []);

  return (
    <div className='container'>
      <Header />
      <Outlet
        context={{
          articles,
          featuredArticle,
          error,
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
