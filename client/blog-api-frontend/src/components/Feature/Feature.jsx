import '../Feature/Feature.css';
import featureImg from '../../assets/images/passion-quote.jpg';

function Feature({ articles }) {

  return (
    <section>
      <img src={ featureImg } alt="" />
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
  )
}

export default Feature;