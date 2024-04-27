import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { Link } from 'react-router-dom';

function Card({ article }) {
  return (
    <Link to={`/article/${article._id}`}>
      <div className='card w-52'>
        <img src={blogImgPlaceholder} />
        <div className='card-text mt-4 text-justify'>
          <h3>{article.article_title}</h3>
          <p>{article.article_text}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
