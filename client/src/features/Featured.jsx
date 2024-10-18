import featuredImg from '../assets/images/passion-quote.jpg';
import { Link } from 'react-router-dom';

function Featured({ featuredArticle }) {
  return (
    <>
      {featuredArticle && (
        <Link to={`/article/${featuredArticle.id}`}>
          <section className='my-5 flex justify-between border-b-2 border-cust-pumpkin pb-8'>
            <img
              src={featuredImg}
              alt=''
              width={450}
              className='max-w-md rounded-lg'
            />
            <div className='m-auto flex flex-col items-center justify-center px-8 py-4'>
              <h2 className='mb-8 text-center'>
                {featuredArticle.article_title}
              </h2>
              <p className='text-left'>{featuredArticle.article_summary}</p>
            </div>
          </section>
        </Link>
      )}
    </>
  );
}

export default Featured;
