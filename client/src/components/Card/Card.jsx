import blogImgPlaceholder from '../../assets/images/blog-img-placeholder.png';

function Card() {
  return (
    <div className='card w-52'>
      <img src={blogImgPlaceholder} />
      <div className='card-text mt-4 text-justify'>
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
