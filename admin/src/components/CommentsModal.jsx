import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function CommentsModal({ handleCloseModal, className }) {

  return (
    <div className={className}>
      Modal
      <FontAwesomeIcon 
        icon={faCircleXmark}
        size='xl'
        style={{ color: '#443850' }}
        className='absolute right-1 top-1 cursor-pointer'
        onClick={handleCloseModal}
      />
    </div>
  )
}

export default CommentsModal;