import Button from '../Button/Button';

function UserAccess() {
  return (
    <div className='userAccess flex gap-4'>
      <Button
        className={'shadow-md'}
        type={'button'}
        text={'Login'}
        style={{
          backgroundColor: 'green',
          color: 'black',
        }}
      />
      <Button text={'Create Account'} />
    </div>
  );
}

export default UserAccess;
