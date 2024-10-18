import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentCard from './CommentCard';
import DialogModal from './DialogModal';

function CommentsModal({ handleCloseModal, className, comments, setReloadData }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentId, setCommentId] = useState();
  const [readyToDelete, setReadyToDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    async function deleteComment() {
      if(commentId === undefined) { return };
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/articles/${id}/comments/${commentId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}`},
        });

        if (response.ok) {
          let responseData = await response.json();
          setReadyToDelete(false);
          setReloadData(true);
          navigate('/articles');
        }
      } catch (error) {
        console.log(error);
      }
    } 
    deleteComment();
  },[readyToDelete]);

  function handleCommentDelete() {
    setShowDialog(true);
    setReadyToDelete(true);
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
              key={comment.id} 
              comment={comment} 
              setReadyToDelete={setReadyToDelete}
              setCommentId={setCommentId}
              setShowDialog={setShowDialog}
            />
          ))
        }
      </div>

      <DialogModal 
        message={'Would you really like to delete'}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleCommentDelete={handleCommentDelete}
      />
    </div>
  )
}

export default CommentsModal;