import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LinkUnderline from '../utilities/LinkUnderline';
import { useLocation } from 'react-router-dom';
import FollowNav from '../features/FollowNav';

function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const errorStatus = !location.state ? '' : location.state.status;
  const errorMessage = !location.state ? '' : location.state.statusMessage;

  return (
    <div className='error-page flex flex-1 flex-col'>
      <div className='error-message absolute left-1/4 right-1/4 top-1/4'>
        <h1>
          {!location.state
            ? '404 Page Not Found'
            : `${errorStatus === undefined ? '' : errorStatus} ${errorMessage === undefined ? '' : errorMessage}`}
        </h1>
        <div className='mt-12'>
          {location.state ? (
            errorStatus === 401 ? (
              <>
                <br />
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
            ) : errorStatus === 500 ? (
              <div className='flex flex-col items-center'>
                <div className='mb-12'>
                  <p>Our API is down. Please try back later!</p>
                  <p>Or stay updated by following us on social media!</p>
                </div>
                <FollowNav />
              </div>
            ) : (
              <>
                <br />
                <p>The page you were looking for does not exist.</p>
                <br />

                <p
                  onClick={() => navigate(-1)}
                  className='group relative mx-auto max-w-fit hover:cursor-pointer'
                >
                  <span>Click here to return to the previous page</span>
                  <LinkUnderline />
                </p>
              </>
            )
          ) : (
            <>
              <br />
              <p>The page you were looking for does not exist.</p>
              <br />

              <p
                onClick={() => navigate(-1)}
                className='group relative mx-auto max-w-fit hover:cursor-pointer'
              >
                <span>Click here to return to the previous page</span>
                <LinkUnderline />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
