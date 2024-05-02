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
    navigate('/');
  }

  return (
    <div className='userAccess flex gap-8'>
      {isAuthenticated === false ? (
        <>
          <Link to='/login'>
            <Button
              className={
                'bg-cust-english-violet text-slate-50 shadow-md hover:bg-cust-english-violet/90 hover:shadow-cust-slate-gray'
              }
              type={'button'}
              text={'Login'}
              style={{
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
              className={
                'border-2 border-cust-pumpkin text-cust-english-violet shadow-md hover:bg-cust-pumpkin/10 hover:shadow-sm hover:shadow-cust-pumpkin/70'
              }
              type={'button'}
              text={'Create Account'}
              style={{
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
          className={
            'bg-cust-pumpkin text-cust-english-violet shadow-md hover:bg-cust-pumpkin/50 hover:shadow-cust-slate-gray'
          }
          type={'button'}
          text={'Logout'}
          style={{
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
