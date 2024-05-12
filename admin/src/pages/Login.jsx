import logo from '../assets/images/blog-api-logo.png';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

function Login() {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-cust-silver'>
      <div className='rounded-md border border-cust-slate-gray p-4 shadow-lg shadow-cust-pumpkin/25'>
        <div className='flex items-center gap-4 p-2'>
          <img src={logo} alt='Site logo' className='max-h-12' />
          <h1 className='text-2xl'>BlogAPI Admin</h1>
        </div>

        <form className='flex flex-col items-center justify-center'>
          <fieldset className='my-8 flex flex-col gap-2'>
            <FormInput
              htmlFor={'login_username'}
              fieldName={'Username'}
              type={'login_text'}
              name={'login_username'}
              id={'login_username'}
              autoFocus={true}
            />
            <FormInput
              htmlFor={'login_password'}
              fieldName={'Password'}
              type={'password'}
              name={'login_password'}
              id={'login_password'}
            />
          </fieldset>
          <Button
            text={'Login'}
            className={'mt-8 w-3/4 rounded-md bg-cust-pumpkin px-4 py-1'}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
