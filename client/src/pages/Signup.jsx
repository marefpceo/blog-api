import TextField from '../components/FormInput';
import Button from '../components/Button';

function Signup() {
  return (
    <section className='signup'>
      <form method='post' className='form mx-auto flex max-w-xl flex-col gap-8'>
        <TextField
          htmlFor={'first_name'}
          type={'text'}
          name={'first_name'}
          id={'first_name'}
          fieldname={'First Name:'}
        />

        <TextField
          htmlFor={'last_name'}
          type={'text'}
          name={'last_name'}
          id={'last_name'}
          fieldname={'Last Name:'}
        />

        <TextField
          htmlFor={'email'}
          type={'text'}
          name={'email'}
          id={'email'}
          fieldname={'Email:'}
        />

        <TextField
          htmlFor={'username'}
          type={'text'}
          name={'username'}
          id={'username'}
          fieldname={'Username:'}
        />

        <TextField
          htmlFor={'password'}
          type={'text'}
          name={'password'}
          id={'password'}
          fieldname={'Password:'}
        />

        <TextField
          htmlFor={'confirm_password'}
          type={'text'}
          name={'confirm_password'}
          id={'confirm_password'}
          fieldname={'Confirm_Password:'}
        />

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
        </fieldset>
      </form>
    </section>
  );
}

export default Signup;
