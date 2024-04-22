import { useNavigate } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div className='error-page h-screen'>
      <div className='error-message absolute top-1/4 left-1/4 right-1/4'>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>The page you were looking for does not exist.</p>
        <p onClick={() => navigate(-1)}>
          Click here to return to the previous page
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
