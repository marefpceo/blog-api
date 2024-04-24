import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const [userInput, setUserInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  async function createUser() {
    await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInput),
    })
      .then((res) => res.json())
      .then((result) => {
        setResponse(result); // Work on sending errors back to incorrect form fields
        console.log(result);
        console.log(response);
      })
      .catch((err) => console.log('error'));
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
    console.log(userInput);
    createUser();
    console.log('Submitted');

    // navigate('/');
  }

  return (
    <section className='signup mb-12 mt-2'>
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
          <sub className='absolute left-1'>test</sub>
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
          <sub className='absolute left-1'>test</sub>
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
          <sub className='absolute left-1'>test</sub>
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
          <sub className='absolute left-1'>test</sub>
        </div>

        <div className='relative'>
          <FormInput
            htmlFor={'password'}
            type={'text'}
            name={'password'}
            id={'password'}
            fieldname={'Password'}
            handleInputChange={handleInputChange}
            value={userInput.password}
          />
          <sub className='absolute left-1'>test</sub>
        </div>

        <div className='relative'>
          <FormInput
            htmlFor={'confirm_password'}
            type={'text'}
            name={'confirm_password'}
            id={'confirm_password'}
            fieldname={'Confirm Password'}
            handleInputChange={handleInputChange}
            value={userInput.confirm_password}
          />
          <sub className='absolute left-1'>test</sub>
        </div>

        <fieldset className='mt-8 flex justify-center gap-8'>
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

export default Signup;
