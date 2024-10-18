import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const [validationResults, setValidationResults] = useState([]);
  const [userInput, setUserInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  async function createUser() {
    await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInput),
    })
      .then((res) => res.json())
      .then((result) => {
        setResponse(result);
        if (result.errors === undefined) {
          navigate('/');
        } else {
          setValidationResults(result.errors);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [e.target.name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUser();
  }

  function handleValidationResults(field) {
    if (!validationResults) {
      return '';
    } else {
      const fieldResult = validationResults.filter(
        (result) => result.path === field,
      );
      const result = Object.assign({}, ...fieldResult);
      return result.msg;
    }
  }

  return (
    <section className='signup mb-12 mt-2 flex-1'>
      <form
        onSubmit={handleSubmit}
        className='form mx-auto flex max-w-xl flex-shrink flex-col items-center gap-4 rounded-md border py-10 
          shadow-xl shadow-slate-300'
      >
        <div className='relative'>
          <FormInput
            htmlFor={'first_name'}
            type={'text'}
            name={'first_name'}
            id={'first_name'}
            fieldname={'First Name'}
            handleInputChange={handleInputChange}
            value={userInput.first_name}
            autoFocus={true}
            valid={'false'}
          />
          <sub className='absolute left-1 text-red-500'>
            {handleValidationResults('first_name')}
          </sub>
        </div>

        <div className='relative'>
          <FormInput
            htmlFor={'last_name'}
            type={'text'}
            name={'last_name'}
            id={'last_name'}
            fieldname={'Last Name'}
            handleInputChange={handleInputChange}
            value={userInput.last_name}
          />
          <sub className='absolute left-1 text-red-500'>
            {handleValidationResults('last_name')}
          </sub>
        </div>

        <div className='relative'>
          <FormInput
            htmlFor={'email'}
            type={'email'}
            name={'email'}
            id={'email'}
            fieldname={'Email'}
            handleInputChange={handleInputChange}
            value={userInput.email}
          />
          <sub className='absolute left-1 text-red-500'>
            {handleValidationResults('email')}
          </sub>
        </div>

        <div className='relative'>
          <FormInput
            htmlFor={'username'}
            type={'text'}
            name={'username'}
            id={'username'}
            fieldname={'Username'}
            handleInputChange={handleInputChange}
            value={userInput.username}
          />
          <sub className='absolute left-1 text-red-500'>
            {handleValidationResults('username')}
          </sub>
        </div>

        <div className='relative'>
          <FormInput
            htmlFor={'password'}
            type={'password'}
            name={'password'}
            id={'password'}
            fieldname={'Password'}
            handleInputChange={handleInputChange}
            value={userInput.password}
          />
          <sub className='absolute left-1 text-red-500'>
            {handleValidationResults('password')}
          </sub>
        </div>

        <div className='relative'>
          <FormInput
            htmlFor={'confirm_password'}
            type={'password'}
            name={'confirm_password'}
            id={'confirm_password'}
            fieldname={'Confirm Password'}
            handleInputChange={handleInputChange}
            value={userInput.confirm_password}
          />
          <sub className='absolute left-1 text-red-500'>
            {handleValidationResults('confirm_password')}
          </sub>
        </div>

        <fieldset className='mt-8 flex justify-center gap-8'>
          <Button
            className={
              'bg-cust-english-violet text-slate-50 shadow-md hover:bg-cust-english-violet/90 hover:shadow-cust-slate-gray'
            }
            text={'Submit'}
            type={'submit'}
            style={{
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
              className={'bg-slate-50 shadow-md hover:shadow-cust-pumpkin/40'}
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

export default Signup;
