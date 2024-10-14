import { useOutletContext } from 'react-router-dom';
import CommentCard from '../components/CommentCard';
import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import LinkUnderline from '../utilities/LinkUnderline';

function Comments() {
  const { id } = useParams();
  const { articleComments, selectedArticle } = useOutletContext({});
  const { isAuthenticated } = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <section className='comments-header mx-auto mb-32 flex w-4/6 flex-1 flex-col items-center'>
        <div className='mb-16 flex flex-col items-center'>
          <img src={blogImgPlaceholder} alt='' width={300} />
        </div>
        <div className='article-header self-start text-left'>
          <h1>{selectedArticle.article_title}</h1>
          <p>Written By: {selectedArticle.author}</p>
          <p>Published: {selectedArticle.date_published}</p>
        </div>
        <div className='article-summary mt-8 text-left indent-8'>
          <p className='text mt-8'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda,
            eos in quis reprehenderit, eaque tenetur non doloribus rem iusto
            suscipit quasi id. Ea, perferendis sed!
          </p>
          <p
            className='cursor-pointer indent-0 text-lg text-cust-pumpkin'
            onClick={() => navigate(-1)}
          >
            Return to article
          </p>
        </div>
      </section>

      <section className='comments flex-1'>
        <div className='comments-header flex justify-around '>
          <h1>Comments</h1>
          {isAuthenticated === false ? (
            <div className='p-1'>
              <Link to='/Login' className='group relative'>
                <span>
                  <strong>Login</strong>
                </span>
                <LinkUnderline />
              </Link>
              &nbsp;or&nbsp;
              <Link to='/signup' className='group relative'>
                <span>
                  <strong>Create Account</strong>
                </span>
                <LinkUnderline />
              </Link>
              <br />
              to leave a comment
            </div>
          ) : (
            <Link to={`/article/${id}/leave_comment`}>
              <Button
                className={
                  'border-2 border-cust-pumpkin text-cust-english-violet shadow-md hover:bg-cust-pumpkin/10 hover:shadow-sm hover:shadow-cust-pumpkin/70'
                }
                type={'button'}
                text={'Leave a Comment'}
                style={{
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
          )}
        </div>
        <div className='comments-div mt-16'>
          {articleComments &&
            articleComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
      </section>
    </>
  );
}

export default Comments;
