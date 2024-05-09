import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LinkUnderline from '../utilities/LinkUnderline';
import { useLocation } from 'react-router-dom';
import FollowNav from '../features/FollowNav';
import { useRouteError } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const location = useLocation();
  const [errorStatus, setErrorStatus] = useState({
    status: '',
    message: '',
  });

  useEffect(() => {
    handleErrorStatus();
  }, []);

  function handleErrorStatus() {
    console.log(error);
    if (error === null) {
      setErrorStatus({
        status: 404,
        message: 'Page Not Found',
      });
    } else if (location.state !== null) {
      setErrorStatus({
        status: location.state.status,
        message: location.state.statusMessage,
      });
    } else {
      setErrorStatus({
        status: error.status,
        message: error.message,
      });
    }
  }

  return (
    <div className='error-page flex flex-1 flex-col'>
      <div className='error-message absolute left-1/4 right-1/4 top-1/4'>
        <h1>{`${errorStatus.status} ${errorStatus.message}`}</h1>
        <div className='mt-12 flex flex-col items-center'>
          {(() => {
            switch (errorStatus.status) {
              case 401:
                return (
                  <>
                    <div className='mb-4'>
                      <Link to={'/login'} className='group relative'>
                        <span>
                          <strong>Login</strong>
                        </span>
                        <LinkUnderline />
                      </Link>
                      &nbsp;or &nbsp;
                      <Link to={'/signup'} className='group relative'>
                        <span>
                          <strong>Signup</strong>
                        </span>
                        <LinkUnderline />
                      </Link>
                      &nbsp;to view this page.
                    </div>
                  </>
                );
              case 404:
                return <p>The page you were looking for does not exist.</p>;
              case 500:
                return <p>Our API is down. Please try back later!</p>;
            }
          })()}

          <div className='flex flex-col items-center'>
            {errorStatus.status === 503 ? (
              ''
            ) : (
              <p
                onClick={() => navigate('/')}
                className='group relative mx-auto my-8 max-w-fit hover:cursor-pointer'
              >
                <span>Return to Home</span>
                <LinkUnderline />
              </p>
            )}
            <div className='mt-12 flex flex-col items-center'>
              <p className='mb-4'>
                Stay updated by following us on social media!
              </p>
              <FollowNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
