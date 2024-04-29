import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [response, setResponse] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const { isAuthenticated, setIsAuthenticated } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [response, isAuthenticated]);

  async function requestLogin() {
    await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginInput),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsValid(true);
        setResponse(result);
        localStorage.setItem('token', result.token);
        navigate(-1);
      })
      .catch((err) => {
        setIsValid(false);
        console.log('Unauthorized');
      });
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setLoginInput({
      ...loginInput,
      [e.target.name]: value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    requestLogin();
  }

  return (
    <section className='login mb-12 mt-2 flex-1'>
      <form
        onSubmit={handleLogin}
        className='form mx-auto mt-12 flex max-w-xl flex-shrink flex-col items-center gap-4 
          rounded-md border py-10 shadow-xl shadow-slate-300'
      >
        <sub className='error-msg mb-3 text-red-500'>
          {!isValid ? 'User Email/ Password incorrect' : ''}
        </sub>
        <FormInput
          htmlFor={'email'}
          type={'email'}
          name={'email'}
          id={'email'}
          fieldname={'User Email'}
          handleInputChange={handleInputChange}
        />

        <FormInput
          htmlFor={'password'}
          type={'password'}
          name={'password'}
          id={'password'}
          fieldname={'Password'}
          handleInputChange={handleInputChange}
        />

        <fieldset className='mt-8 flex justify-center gap-24'>
          <Button
            className={'shadow-md'}
            text={'Submit'}
            type={'submit'}
            style={{
              backgroundColor: 'green',
              color: 'black',
              borderRadius: '8px',
              padding: '0.3em 1.2em',
              height: '36px',
              fontSize: '1em',
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'border-color 0.25',
            }}
          />

          <Link to='/'>
            <Button
              className={'shadow-md'}
              text={'Cancel'}
              type={'button'}
              style={{
                backgroundColor: '#f3f3f3',
                color: 'black',
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
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
