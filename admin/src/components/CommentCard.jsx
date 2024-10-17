import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function CommentCard({ comment, setCommentId, setShowDialog }) {

  function handleClick() {
    setCommentId(comment.id);
    setShowDialog(true);
  }

  return (
    <div className='comment-card mx-auto mb-6 p-3 flex w-2/3 items-center gap-12 rounded-lg border 
      bg-slate-200 border-cust-beige/50  text-cust-english-violet shadow-md justify-between 
      shadow-cust-english-violet/60'
    >
      <div className='user-avatar mx-auto rounded-full bg-cust-slate-gray/50 p-3'>
        <FontAwesomeIcon 
          icon={faUser} 
          size='xl'
          color='#443850'
        />
      </div>
      <div className='comment-info w-full text-left'>
        <div className="comment-header flex justify-between mb-4">
          <h3>
            {comment.comment_user.username}{' '}
          </h3>
          <div>{DateTime.fromISO(comment.createdAt).toFormat('DDD')}</div>
        </div>
        <p>{comment.comment_text}</p>
      </div>
      <FontAwesomeIcon
            icon={faTrashCan}
            size='lg'
            color='#443850'
            onClick={handleClick}
            cursor='pointer'
      />
    </div>
  );
}

export default CommentCard;
