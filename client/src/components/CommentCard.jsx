import userImgPlaceholder from '../assets/images/user-img-placeholder.png';
import { DateTime } from 'luxon';

function CommentCard({ comment }) {
  return (
    <div className='comment-card mx-auto mb-6 flex w-2/3 items-center gap-12 rounded-lg border p-3'>
      <div className='user-avatar mx-auto rounded-full bg-stone-200 p-3'>
        <img src={userImgPlaceholder} width={30} />
      </div>
      <div className='comment-info w-full text-left'>
        <h3>
          {comment.comment_user.username}
          {DateTime.fromISO(comment.createdAt).toFormat('DDD')}
        </h3>
        <p>{comment.comment_text}</p>
      </div>
    </div>
  );
}

export default CommentCard;
