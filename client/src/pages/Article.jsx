import { Outlet, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleSection from '../features/ArticleSection';

function Article() {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useOutletContext();

  useEffect(() => {
    async function getSelectedArticle() {
      try {
        const articleResponse = await fetch(
          `http://localhost:3000/articles/${id}`,
        );
        const commentsResponse = await fetch(
          `http://localhost:3000/articles/${id}/comments`,
        );

        if (!articleResponse.ok) {
          throw new Error(`HTTP error: Status ${articleResponse.status}`);
        }

        if (!commentsResponse.ok) {
          throw new Error(`HTTP error: Status ${commentsResponse.status}`);
        }

        let articleResponseData = await articleResponse.json();
        let commentsResponseData = await commentsResponse.json();

        setSelectedArticle(articleResponseData);
        setArticleComments(commentsResponseData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSelectedArticle(null);
        setArticleComments(null);
      } finally {
        setLoading(false);
      }
    }
    getSelectedArticle();
  }, []);

  return (
    <>
      <Outlet
        context={{
          selectedArticle,
          articleComments,
          isAuthenticated,
        }}
      />
    </>
  );
}

export default Article;
