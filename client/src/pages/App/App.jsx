import { useEffect, useState } from 'react';
import './App.css';
import Header from '../../components/Header';
import Featured from '../../features/Featured';
import Subsection from '../../features/Subsection';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

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
      <Outlet
        context={{
          articles,
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
