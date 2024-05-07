import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LinkUnderline from '../utilities/LinkUnderline';
import { useLocation } from 'react-router-dom';

function ErrorPage({ status, statusMessage }) {
  const navigate = useNavigate();
  const error = useRouteError();
  const location = useLocation();
  console.log(location.state.status);
  console.log(location.state.statusMessage);

  return (
    <div className='error-page flex flex-1 flex-col'>
      <div className='error-message absolute left-1/4 right-1/4 top-1/4'>
        <h1>
          {status
            ? `${status} ${statusMessage}`
            : `${location.state.status} ${location.state.statusMessage}`}
        </h1>
        {status === 401 ? (
          <>
            <br />
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
        ) : (
          <>
            <br />
            <br />
            <p>The page you were looking for does not exist.</p>
            <br />
          </>
        )}
        <p
          onClick={() => navigate(-1)}
          className='group relative mx-auto max-w-fit hover:cursor-pointer'
        >
          <span>Click here to return to the previous page</span>
          <LinkUnderline />
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
