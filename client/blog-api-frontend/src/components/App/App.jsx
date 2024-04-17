import { useEffect, useState } from 'react'
import './App.css'

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
  },[]);

  return (
    <div className='container'>
      <h1>Blog API</h1>
      {/* Test to verify that api data was property */}
      <div>
        {articles.map(article => (
          <div>
            {/* <h2 key={article.article_title}>{article.article_title}</h2> */}
            <p key={article.article_text}>{article.article_text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
