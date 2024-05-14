import { useOutletContext } from 'react-router-dom';
import { DateTime } from 'luxon';
import Button from '../components/Button';

function All() {
  const { allArticles } = useOutletContext([]);

  return (
    <>
      <h1 className='text-4xl text-cust-silver'>All Articles</h1>

      <div className='list-div m-8'>
        {allArticles.map((article) => (
          <div
            key={article._id}
            className='article-list-item my-8 flex justify-between'
          >
            <div
              className='article-info flex w-3/4 flex-col justify-between 
              rounded-md bg-cust-silver p-4 text-cust-english-violet shadow-md 
              shadow-cust-english-violet'
            >
              <div className='mb-4 grid w-full grid-cols-3 grid-rows-1'>
                <h2 className='text-xl'>{article.article_title}</h2>
                <p>
                  <strong>
                    {DateTime.fromISO(article.createdAt).toFormat(
                      'dd LLLL yyyy',
                    )}
                  </strong>
                </p>
                <p className='text-right'>
                  <span>
                    <em>Written by: &nbsp;&nbsp;</em>
                  </span>
                  {article.author}
                </p>
              </div>
              <div>
                <em>{article.article_summary}</em>
              </div>
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
