function Signup() {
  return (
    <section className='signup'>
      <form method='post'>
        <label htmlFor='first_name'>
          {' '}
          First Name:
          <input type='text' name='first_name' id='first_name' />
        </label>
      </form>
    </section>
  );
}

export default Signup;
