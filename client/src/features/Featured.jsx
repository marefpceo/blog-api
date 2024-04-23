import featuredImg from '../assets/images/passion-quote.jpg';

function Featured({ featuredArticle }) {
  return (
    <section className='my-5 flex justify-between'>
      <img
        src={featuredImg}
        alt=''
        width={450}
        className='max-w-md rounded-lg'
      />

      <div className='m-auto flex flex-col items-center justify-center px-8 py-4'>
        <h2 className='mb-8 text-center'>{featuredArticle.article_title}</h2>
        <p className='text-left'>{featuredArticle.article_summary}</p>
      </div>
    </section>
  );
}

export default Featured;
