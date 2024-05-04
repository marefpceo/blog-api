import CommentCard from '../components/CommentCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function CommentSection({ articleComments }) {
  const { id } = useParams();
  const { isAuthenticated } = useOutletContext();

  return (
    <section className='comments mb-8'>
      <div className='comment-section-header mx-auto flex w-4/6 justify-between'>
        <h2 className='mb-8'>Top Comments</h2>
        <Link
          to={
            isAuthenticated === false
              ? '/signup'
              : `/article/${id}/leave_comment`
          }
        >
          <Button
            className={
              'border-2 border-cust-pumpkin text-cust-english-violet shadow-md hover:bg-cust-pumpkin/10 hover:shadow-sm hover:shadow-cust-pumpkin/70'
            }
            type={'button'}
            text={
              isAuthenticated === false ? 'Create Account' : 'Leave a Comment'
            }
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
      </div>

      {articleComments &&
        articleComments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}

      <Link to={`/article/${id}/comments`}>
        <Button
          className={'bg-slate-50 shadow-md hover:shadow-cust-pumpkin/30'}
          type={'button'}
          text={'See All Comments'}
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
    </section>
  );
}

export default CommentSection;
