import './Featured.css';
import featuredImg from '../../assets/images/passion-quote.jpg';

function Featured({ articles }) {
  return (
    <section className='rounded-lg shadow-md'>
      <img src={featuredImg} alt='' />
      <div>
        <h1>Blog API</h1>
        {/* Test to verify that api data was property */}
        <div className='feature-card'>
          {articles.map((article) => (
            <div key={article._id}>
              {/* <h2 key={article.article_title}>{article.article_title}</h2> */}
              <p>{article.article_text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featured;
