import { Outlet, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Article() {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSelectedArticle() {
      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          fetch(`http://localhost:3000/articles/${id}`),
          fetch(`http://localhost:3000/articles/${id}/comments`),
        ]);

        if (!articleResponse.ok || !commentsResponse.ok) {
          const error = new Error();
          if (
            articleResponse.status === 500 ||
            commentsResponse.status === 500
          ) {
            error.message = 'Internal Server Error';
            error.status = 500;
            throw error;
          }
          if (
            articleResponse.status === 404 ||
            commentsResponse.status === 404
          ) {
            error.message = 'Page Not Found';
            error.status = 404;
            throw error;
          }
          throw new Error(
            !articleResponse.ok
              ? articleResponse.status
              : commentsResponse.status,
          );
        } else {
          let articleResponseData = await articleResponse.json();
          let commentsResponseData = await commentsResponse.json();

          setSelectedArticle(articleResponseData);
          setArticleComments(commentsResponseData);
        }
      } catch (error) {
        console.error(error, error.status);
        setSelectedArticle(null);
        setArticleComments(null);
        return navigate('*', {
          state: { status: error.status, statusMessage: error.message },
        });
      } finally {
        setRefreshComments(false);
        setTimeout(setLoading(false), 3000);
      }
    }
    getSelectedArticle();
  }, [refreshComments]);

  return (
    <>
      {loading ? (
        <p className='h-screen'>Loading. . . </p>
      ) : (
        <Outlet
          context={{
            selectedArticle,
            articleComments,
            isAuthenticated,
            setRefreshComments,
          }}
        />
      )}
    </>
  );
}

export default Article;
