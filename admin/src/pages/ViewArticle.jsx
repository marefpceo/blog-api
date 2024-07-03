import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComment] = useState([]);

  useEffect(() => {
    async function getArticle() {
      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          fetch(`http://localhost:3000/articles/${id}`),
          fetch(`http://localhost:3000/articles/${id}/comments`),
        ]);

        let articleResponseData = await articleResponse.json();
        let commentsResponseData = await commentsResponse.json();

        setArticle(articleResponseData);
        setComment(commentsResponseData);
      } catch (error) {
        console.error(error, error.status);
      }
    }
    getArticle();
    console.log(article);
    console.log(comments);
  }, []);

  return (
    <>
      <h1 className='title text-4xl text-cust-silver'>View Article</h1>
      <div className='flex gap-12'>
        <Link to={`/edit/${id}`} state={{ id: id }}>
          Edit Article
        </Link>
        <Link to={-1}>Back</Link>
      </div>

      <section></section>
    </>
  );
}

export default ViewArticle;
