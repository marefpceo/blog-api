import Button from './Button';

function DialogModal({ message, showDialog, setShowDialog, handleCommentDelete }) {

  function handleYesClick() {
    handleCommentDelete();
    setShowDialog(false);
  }

  function handleNoClick() {
    setShowDialog(false);
  }

  return (
    <div className={`${showDialog === true ? 'flex' : 'hidden'} w-80 h-40 p-4 z-30 flex-col 
      justify-center items-center absolute left-0 top-0 right-0 bottom-0 m-auto rounded-md
      bg-cust-english-violet/95`}>
      <p>{ message }</p>

      <div className='mt-10 gap-8 flex justify-between'>
        <Button 
          id={'yes-btn'}
          text={'Yes'}
          className={'w-20 rounded-sm bg-cust-beige text-cust-english-violet'}
          onClick={handleYesClick}
        />

        <Button 
          id={'no-btn'}
          text={'No'}
          className={'w-20 rounded-sm bg-cust-beige text-cust-english-violet'}
          onClick={handleNoClick}
        />
      </div>
    </div>
  )
}

export default DialogModal;
