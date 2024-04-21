import featuredImg from '../assets/images/passion-quote.jpg';

function Featured({ articles }) {
  return (
    <section className='flex justify-between my-5'>
      <img
        src={featuredImg}
        alt=''
        width={600}
        height={400}
        className='rounded-lg'
      />

      <div className='feature-card flex items-center'>
        {/* {articles.map((article) => (
          <div className='feature-text py-4 px-8' key={article._id}>
            <h2 className='mb-8'>{article.article_title}</h2>
            <p className='text-left'>{article.article_text}</p>
          </div>
        ))} */}
        <div className='feature-text py-4 px-8'>
          <h2 className='mb-8'>{}</h2>
          <p className='text-left'>{}</p>
        </div>
      </div>
    </section>
  );
}

export default Featured;
