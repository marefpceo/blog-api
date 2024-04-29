import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button';

function LeaveComment() {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const { isAuthenticated } = useOutletContext();
  const [textInput, setTextInput] = useState({
    comment_text: '',
    comment_article: id,
  });

  function handleInputChange(e) {
    const value = e.target.value;
    setTextInput({
      ...textInput,
      [e.target.name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(token);
    console.log(isAuthenticated);
  }

  return (
    <section className='leave-comment flex-1'>
      <h2>Leave a Comment</h2>

      <form
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col items-center'
      >
        <textarea
          className='mt-1 min-w-96 rounded-md p-2 shadow-inner shadow-slate-400 focus:border-2 
           focus:border-green-500 focus:outline-none'
          name='comment_text'
          id='comment_text'
          cols='40'
          rows='5'
          autoFocus
          onChange={handleInputChange}
        ></textarea>

        <Button
          className={'mt-8 shadow-md'}
          type={'submit'}
          text={'Post Comment'}
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
      </form>
    </section>
  );
}

export default LeaveComment;
