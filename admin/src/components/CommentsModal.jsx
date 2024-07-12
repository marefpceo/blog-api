import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import CommentCard from './CommentCard';

function CommentsModal({ handleCloseModal, className, comments, commentDelete, setCommentId }) {
  return (
    <div className={className}>
      <div className='modal-header mb-8 flex justify-between relative'>
        <h2>Comments</h2>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size='xl'
          style={{ color: '#443850' }}
          className='absolute top-0 right-1 cursor-pointer'
          onClick={handleCloseModal}
        />
      </div>

      <div>
        {
          comments.map((comment) => (
            <CommentCard 
              key={comment._id} 
              comment={comment} 
              commentDelete={commentDelete}
              setCommentId={setCommentId}
            />
          ))
        }
      </div>

    </div>
  )
}

export default CommentsModal;