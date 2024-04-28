import { useOutletContext } from 'react-router-dom';
import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../features/CommentSection';

function Article() {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [articleComments, setArticleComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(selectedArticle);
        console.log(articleComments);
      }
    }
    getSelectedArticle();
  }, []);

  return (
    <>
      <section className='article mx-auto mb-20 flex w-4/6 flex-1 flex-col items-center'>
        <div className='flex flex-col items-center'>
          <img src={blogImgPlaceholder} alt='' width={300} />
        </div>
        <div className='article-header self-start text-left'>
          <h1>{selectedArticle.article_title}</h1>
          <p>Written By: {selectedArticle.author}</p>
          <p>Published: {selectedArticle.date_published}</p>
        </div>
        <div className='text'>
          <p className='mt-8 text-left'>
            {selectedArticle.article_text}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, voluptatum ullam tenetur nihil incidunt aperiam
            ducimus sunt accusantium qui maiores cumque vel sapiente.
            Repellendus incidunt cumque quaerat possimus? Unde, repellat?
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            tenetur tempore! Tempore dolorem pariatur necessitatibus dicta rerum
            quas fugiat nesciunt tenetur, qui nihil deserunt reprehenderit culpa
            ducimus distinctio, nemo dolor. Quas quod dolorum earum pariatur
            accusamus, iusto aspernatur sunt aperiam a laudantium reprehenderit
            autem iste obcaecati quos fuga. Minima, officiis?
          </p>
        </div>
      </section>
      <CommentSection articleComments={articleComments} />
    </>
  );
}

export default Article;
