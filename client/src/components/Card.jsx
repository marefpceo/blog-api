import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';

function Card({ article }) {
  return (
    <div className='card w-52'>
      <img src={blogImgPlaceholder} />
      <div className='card-text mt-4 text-justify'>
        <h3>{article.article_title}</h3>
        <p>{article.article_text}</p>
      </div>
    </div>
  );
}

export default Card;
