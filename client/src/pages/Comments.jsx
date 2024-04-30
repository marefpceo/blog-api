import { useOutletContext } from 'react-router-dom';
import CommentCard from '../components/CommentCard';
import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';

function Comments() {
  const { id } = useParams();
  const { articleComments, selectedArticle } = useOutletContext({});
  const { isAuthenticated } = useOutletContext();
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
        <div className='comments-header'>
          <h1>Comments</h1>
          <Link
            to={
              isAuthenticated === false
                ? '/signup'
                : `/article/${id}/leave_comment`
            }
          >
            <Button
              className={'shadow-md'}
              type={'button'}
              text={
                isAuthenticated === false ? 'Create Account' : 'Leave a Comment'
              }
              style={{
                backgroundColor: 'green',
                color: 'black',
                borderRadius: '8px',
                padding: '0.3em 1.2em',
                height: '36px',
                fontSize: '1em',
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'border-color 0.25',
              }}
            />
          </Link>
        </div>
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
