import { useOutletContext } from 'react-router-dom';
import CommentCard from '../components/CommentCard';
import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useNavigate } from 'react-router-dom';

function Comments() {
  const { articleComments, selectedArticle } = useOutletContext({});
  const navigate = useNavigate();

  return (
    <>
      <div className='comments-header mb-20'>
        <div className='flex flex-col items-center'>
          <img src={blogImgPlaceholder} alt='' width={300} />
        </div>
        <div className='article-header mx-auto'>
          <h1>{selectedArticle.article_title}</h1>
          <p>Written By: {selectedArticle.author}</p>
          <p>Published: {selectedArticle.date_published}</p>
        </div>
        <div className='article-summary mt-8 text-left indent-8'>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda,
            eos in quis reprehenderit, eaque tenetur non doloribus rem iusto
            suscipit quasi id. Ea, perferendis sed!{' '}
          </p>
          <span
            className='cursor-pointer text-lg text-blue-400'
            onClick={() => navigate(-1)}
          >
            Return to article
          </span>
        </div>
      </div>
      <section className='comments flex-1'>
        <h1>Comments</h1>
        <div className='comments-div mt-16'>
          {articleComments &&
            articleComments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
        </div>
      </section>
    </>
  );
}

export default Comments;
