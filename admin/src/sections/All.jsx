import { useOutletContext } from 'react-router-dom';

function All() {
  const { allArticles } = useOutletContext([]);

  return (
    <>
      <h1 className='text-4xl text-cust-silver'>All Articles</h1>

      <div className='list-div'>
        <div>
          {allArticles.map((article) => (
            <h2 key={article._id}>{article.article_title}</h2>
          ))}
        </div>
      </div>
    </>
  );
}

export default All;
