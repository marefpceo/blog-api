import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { Link } from 'react-router-dom';

function Card({ article, className }) {
  return (
    <Link to={`/article/${article.id}`}>
      <div className={`card w-52 ${className}`}>
        <img src={blogImgPlaceholder} />
        <div className='card-text mt-4 text-justify'>
          <h3>{article.article_title}</h3>
          <p>{article.article_summary}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
