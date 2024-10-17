import logo from '../assets/images/blog-api-logo.png';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  function handleInputChange(e) {
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [e.target.name]: value,
    });
  }

  async function requestLogin() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('username', responseData.username);
        navigate(0);
      }
      setInvalidLogin(false);
    } catch (error) {
      setInvalidLogin(true);
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    requestLogin();
  }

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-cust-silver'>
      <div className='rounded-md border border-cust-slate-gray p-4 shadow-[0_3px_20px_rgb(0,0,0,0.2)] shadow-cust-pumpkin/25'>
        <div className='flex items-center gap-4 p-2'>
          <img src={logo} alt='Site logo' className='max-h-12' />
          <h1 className='text-2xl'>BlogAPI Admin</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center'
        >
          <fieldset className='my-8 flex flex-col gap-2'>
            <FormInput
              htmlFor={'email'}
              fieldName={'Email'}
              type={'email'}
              name={'email'}
              id={'email'}
              onChange={handleInputChange}
              autoFocus={true}
            />
            <FormInput
              htmlFor={'password'}
              fieldName={'Password'}
              type={'password'}
              name={'password'}
              id={'password'}
              onChange={handleInputChange}
            />
          </fieldset>
          <div>
            <sub className='text-red-700'>
              {invalidLogin === false ? '' : 'Invalid Login Credentials'}
            </sub>
          </div>
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
