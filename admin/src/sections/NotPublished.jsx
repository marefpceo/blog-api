import { DateTime } from 'luxon';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NotPublished() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [nonPublishedArticles, setNonPublishedArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      try {
        const response = await fetch('http://localhost:3000/admin/articles', {
          headers: { Authorization: `Bearer ${token}` },
        });

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
          error.message = 'API Connection Error';
          error.status = 500;
          throw error;
        } else {
          let responseData = await response.json();
          setNonPublishedArticles(
            responseData.articlesList.filter(
              (article) => article.isPublished === false,
            ),
          );
        }
      } catch (error) {
        console.error(error.message);
        setNonPublishedArticles(null);
        if (error instanceof TypeError) {
          return navigate('*', {
            state: { status: 503, statusMessage: 'Service Unavailable' },
          });
        } else {
          return navigate('*', {
            state: { status: error.status, statusMessage: error.message },
          });
        }
      }
    }
    getArticles();
  }, []);

  async function publishArticle(id, status) {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/articles/${id}/publish`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            _id: id,
            isPublished: status,
          }),
        },
      );

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    const id = e.target.id;
    const name = e.target.name;
    const status = name === 'notPublished' ? 'true' : 'false';

    publishArticle(id, status);
  }

  return (
    <>
      <h1 className='text-4xl text-cust-silver'>Unpublished Articles</h1>

      <div className='list-div m-8'>
        {nonPublishedArticles.map((article) => (
          <div
            key={article._id}
            className='article-list-item my-8 flex justify-between'
          >
            <div
              className='article-info flex w-3/4 flex-col justify-between
              rounded-md bg-cust-silver p-4 text-cust-english-violet shadow-md
              shadow-cust-english-violet'
            >
              <Link to={`/edit/${article._id}`} state={{ id: article._id }}>
                <div className='relative mb-4 grid w-full grid-cols-3 grid-rows-1'>
                  <h2 className='text-xl'>{article.article_title}</h2>
                  <p className='absolute left-1/2 top-0'>
                    <strong>
                      {DateTime.fromISO(article.createdAt).toFormat(
                        'dd LLLL yyyy',
                      )}
                    </strong>
                  </p>
                  <p className='absolute right-0 text-right'>
                    <span>
                      <em>Written by: &nbsp;&nbsp;</em>
                    </span>
                    {article.author}
                  </p>
                </div>
                <div>
                  <em>{article.article_summary}</em>
                </div>
              </Link>
            </div>
            <div
              className='article-btn-div flex w-1/5 flex-col items-center 
                justify-evenly rounded-md bg-cust-english-violet/30 text-cust-beige shadow-md 
                shadow-cust-english-violet'
            >
              <p>Click to Publish</p>
              <Button
                text={'Not Published'}
                className={
                  'h-10 w-32 rounded-md bg-red-600 shadow-md shadow-cust-english-violet'
                }
                id={article._id}
                name={'notPublished'}
                onClick={handleClick}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NotPublished;
