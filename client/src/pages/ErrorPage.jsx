import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className='error-page'>
      <div className='error-message'>
        <h1>{} Not Found</h1>
        <p>The page you were looking for does not exist.</p>
        <p onClick={() => navigate(-1)}>
          Click here to return to the previous page
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
