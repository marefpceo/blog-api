import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

function ErrorPage({ status, statusMessage }) {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div className='error-page h-screen'>
      <div className='error-message absolute left-1/4 right-1/4 top-1/4'>
        <h1>{status ? `${status} ${statusMessage}` : '404 Page Not Found'}</h1>
        {status === 401 ? (
          <>
            <br />
            <br />
            <p onClick={() => navigate('/signup')}>
              Create an account to view this page
            </p>
          </>
        ) : (
          <p>The page you were looking for does not exist.</p>
        )}

        <br />
        <p>- or -</p>
        <br />

        <p onClick={() => navigate(-1)}>
          Click here to return to the previous page
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
