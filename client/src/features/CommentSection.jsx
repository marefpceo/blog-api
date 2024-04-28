import CommentCard from '../components/CommentCard';
import Button from '../components/Button';

function CommentSection({ articleComments }) {
  return (
    <section className='comments mb-8'>
      <h2 className='mb-8'>Top Comments</h2>
      {articleComments &&
        articleComments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
    </section>
  );
}

export default CommentSection;
