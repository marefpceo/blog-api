import featuredImg from '../assets/images/passion-quote.jpg';
import { useOutletContext } from 'react-router-dom';

function Featured() {
  const { featuredArticle } = useOutletContext();

  console.log(featuredArticle);
  return (
    <section className='flex justify-between my-5'>
      <img
        src={featuredImg}
        alt=''
        width={600}
        height={400}
        className='rounded-lg'
      />

      <div className='flex flex-col items-center justify-center m-auto py-4 px-8'>
        <h2 className='mb-8 text-center'>{featuredArticle.article_title}</h2>
        <p className='text-left'>{featuredArticle.article_summary}</p>
      </div>
    </section>
  );
}

export default Featured;
