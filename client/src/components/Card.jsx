import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { Link } from 'react-router-dom';

function Card({ article, className, articleImg }) {
  return (
    <Link to={`/article/${article.id}`}>
      <div className={`card w-52 ${className}`}>
        <img src={articleImg === null ? blogImgPlaceholder : articleImg} />
        <div className='card-text my-6 text-justify'>
          <h3 className='text-base font-bold'>{article.article_title}</h3>
          <p className='mt-2 text-sm'>{article.article_summary}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
