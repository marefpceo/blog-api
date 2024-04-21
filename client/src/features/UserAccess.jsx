import Button from '../components/Button';

function UserAccess() {
  return (
    <div className='userAccess flex gap-8'>
      <Button
        className={'shadow-md'}
        type={'button'}
        text={'Login'}
        style={{
          backgroundColor: 'green',
          color: 'black',
          borderRadius: '8px',
          padding: '0.3em 1.2em',
          height: '36px',
          fontSize: '1em',
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'border-color 0.25',
        }}
      />
      <Button
        className={'shadow-md'}
        type={'button'}
        text={'Create Account'}
        style={{
          backgroundColor: '#f3f3f3',
          color: 'black',
          borderRadius: '8px',
          padding: '0.3em 1.2em',
          height: '36px',
          fontSize: '1em',
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'border-color 0.25',
        }}
      />
    </div>
  );
}

export default UserAccess;
