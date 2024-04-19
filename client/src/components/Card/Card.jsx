import '../Card/Card.css';
import blogImgPlaceholder from '../../assets/images/blog-img-placeholder.png';

function Card() {
  return (
    <div className='card'>
      <img src={blogImgPlaceholder} width={200} />
      <div className='card-text'>
        <h3>Recent Article Title</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
          repellat!
        </p>
      </div>
    </div>
  );
}

export default Card;
