import userImgPlaceholder from '../assets/images/user-img-placeholder.png';

function CommentCard({ comment }) {
  return (
    <div className='comment-card'>
      <div className='user-avatar'>
        <img src={userImgPlaceholder} width={30} />
      </div>
      <div className='comment-info'>
        <h3>
          {comment.comment_user.username} {comment.createdAt}
        </h3>
        <p>{comment.comment_text}</p>
      </div>
    </div>
  );
}

export default CommentCard;
