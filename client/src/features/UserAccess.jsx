import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserAccess({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  function handleLogout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate(0);
  }

  return (
    <div className='userAccess flex gap-8'>
      {isAuthenticated === false ? (
        <>
          <Link to='/login'>
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
          </Link>

          <Link to='/signup'>
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
          </Link>
        </>
      ) : (
        <Button
          className={'shadow-md'}
          type={'button'}
          text={'Logout'}
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
          onClick={handleLogout}
        />
      )}
    </div>
  );
}

export default UserAccess;
