import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  console.log(error);
  return (
    <div className='m-0 grid h-screen w-screen grid-cols-layout grid-rows-layout p-0'>
      {error === null ? 
       ( <div>
         <p>404 Error</p>
          <p>Page Not Found</p>
       </div>) : 
        ('')
      }
    </div>
  );
}

export default ErrorPage;
