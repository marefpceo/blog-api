import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import CommentCard from './CommentCard';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CommentsModal({ handleCloseModal, className, comments }) {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [readyToDelete, setReadyToDelete] = useState(false);
  const [commentId, setCommentId] = useState();
  

  useEffect(() => {
    async function deleteComment() {
      if(commentId === undefined) { return };
      try {
        const response = await fetch(`http://localhost:3000/articles/${id}/comments/${commentId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}`},
        });

        if (response.ok) {
          let responseData = await response.json();
          setReadyToDelete(false);
          console.log(responseData);
        }
      } catch (error) {
        console.log(error);
      }
    } 
    deleteComment();
  },[readyToDelete]);

  function handleCommentDelete() {
    setReadyToDelete(true);
    console.log('handle delete');
    console.log(commentId);
  }

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
              handleCommentDelete={handleCommentDelete}
              setCommentId={setCommentId}
            />
          ))
        }
      </div>

    </div>
  )
}

export default CommentsModal;