import { useOutletContext } from 'react-router-dom';
import { DateTime } from 'luxon';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function All() {
  const token = localStorage.getItem('token');
  const { allArticles } = useOutletContext([]);
  const navigate = useNavigate();

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
            id: id,
            isPublished: status,
          }),
        },
      );

      const responseData = await response.json();

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
      <h1 className='text-4xl text-cust-silver'>All Articles</h1>

      <div className='list-div m-8'>
        {allArticles.map((article) => (
          <div
            key={article.id}
            className='article-list-item my-8 flex justify-between'
          >
            <div
              className='article-info flex w-3/4 flex-col justify-between
              rounded-md bg-cust-silver p-4 text-cust-english-violet shadow-md
              shadow-cust-english-violet'
            >
              <Link to={`/article/${article.id}`} state={{ id: article.id }}>
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
              {article.isPublished ? (
                <>
                  <p>Click to Unpublish</p>
                  <Button
                    text={'Published'}
                    className={
                      'h-10 w-24 rounded-md bg-green-600 shadow-md shadow-cust-english-violet'
                    }
                    id={article.id}
                    name={'published'}
                    onClick={handleClick}
                  />
                </>
              ) : (
                <>
                  <p>Click to Publish</p>
                  <Button
                    text={'Not Published'}
                    className={
                      'h-10 w-32 rounded-md bg-red-600 shadow-md shadow-cust-english-violet'
                    }
                    id={article.id}
                    name={'notPublished'}
                    onClick={handleClick}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default All;
