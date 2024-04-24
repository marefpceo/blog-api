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
        console.log(result.user);
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
    <section className='signup mb-40 mt-5'>
      <form
        onSubmit={handleSubmit}
        className='form mx-auto flex max-w-xl flex-col items-center gap-8 rounded-md border py-16 
          shadow-xl shadow-slate-300'
      >
        <FormInput
          htmlFor={'first_name'}
          type={'text'}
          name={'first_name'}
          id={'first_name'}
          fieldname={'First Name'}
          handleInputChange={handleInputChange}
          value={userInput.first_name}
        />

        <FormInput
          htmlFor={'last_name'}
          type={'text'}
          name={'last_name'}
          id={'last_name'}
          fieldname={'Last Name'}
          handleInputChange={handleInputChange}
          value={userInput.last_name}
        />

        <FormInput
          htmlFor={'email'}
          type={'text'}
          name={'email'}
          id={'email'}
          fieldname={'Email'}
          handleInputChange={handleInputChange}
          value={userInput.email}
        />

        <FormInput
          htmlFor={'username'}
          type={'text'}
          name={'username'}
          id={'username'}
          fieldname={'Username'}
          handleInputChange={handleInputChange}
          value={userInput.username}
        />

        <FormInput
          htmlFor={'password'}
          type={'text'}
          name={'password'}
          id={'password'}
          fieldname={'Password'}
          handleInputChange={handleInputChange}
          value={userInput.password}
        />

        {/* <FormInput
          htmlFor={'confirm_password'}
          type={'text'}
          name={'confirm_password'}
          id={'confirm_password'}
          fieldname={'Confirm Password'}
          handleInputChange={handleInputChange}
          value={userInput.confirm_password}
        /> */}

        <fieldset className='flex justify-center gap-8'>
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
