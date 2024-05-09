import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

function LeaveComment() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useOutletContext();
  const { setRefreshComments } = useOutletContext();
  const [validationResults, setValidationResults] = useState(null);
  const [textInput, setTextInput] = useState({
    comment_text: '',
    comment_article: id,
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      const error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }
  });

  async function postComment() {
    try {
      const response = await fetch(
        `http://localhost:3000/articles/${id}/comment_post`,
        {
          method: 'POST',
          headers: new Headers({
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(textInput),
        },
      );

      const responseData = await response.json(response);

      if (!response.ok) {
        return navigate('*', {
          state: {
            status: response.status,
            statusMessage: response.statusText,
          },
        });
      } else {
        setValidationResults(responseData.errors[0].msg);
        console.log(responseData === true);
      }
    } catch (error) {
      console.error(error, error.status);
    }
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setTextInput({
      ...textInput,
      [e.target.name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setValidationResults(false);
    postComment();
    setRefreshComments(true);
    if (validationResults === false) {
      navigate(-1);
    }
  }

  return (
    token && (
      <section className='leave-comment flex-1'>
        <h2>Leave a Comment</h2>

        <form
          onSubmit={handleSubmit}
          className='mt-4 flex flex-col items-center'
        >
          <textarea
            className='mb-8 mt-1 min-w-96 rounded-md p-2 shadow-inner shadow-slate-400 focus:border-2 
           focus:border-cust-pumpkin focus:outline-none'
            name='comment_text'
            id='comment_text'
            cols='40'
            rows='5'
            autoFocus
            onChange={handleInputChange}
          ></textarea>

          <sub className='mb-8 text-red-500'>
            {validationResults === null ? '' : validationResults}
          </sub>
          <Button
            className={
              'bg-cust-english-violet text-slate-50 shadow-md hover:bg-cust-english-violet/90 hover:shadow-cust-slate-gray'
            }
            type={'submit'}
            text={'Post Comment'}
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
        </form>
      </section>
    )
  );
}

export default LeaveComment;
