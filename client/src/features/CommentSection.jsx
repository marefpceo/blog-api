import CommentCard from '../components/CommentCard';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CommentSection({ articleComments }) {
  const { id } = useParams();
  return (
    <section className='comments mb-8'>
      <h2 className='mb-8'>Top Comments</h2>
      {articleComments &&
        articleComments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}

      <Link to={`/article/${id}/comments`}>
        <Button
          className={'shadow-md'}
          type={'button'}
          text={'See All Comments'}
          style={{
            backgroundColor: '#f3f3f3',
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
    </section>
  );
}

export default CommentSection;
