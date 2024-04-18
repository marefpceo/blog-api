import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Feature from '../Feature/Feature';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      const response = await fetch('http://localhost:3000/articles');
      let responseData = await response.json();
      setArticles(responseData);
      console.log(responseData);
    }
    getArticles();
  }, []);

  return (
    <div className='container'>
      <Header />
      <Feature 
        articles={articles}
      />
      
    </div>
  );
}

export default App;
