import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function ViewArticle() {
  const token = localStorage.getItem('token');
  const [article, setArticle] = useState({});
  const [comments, setComment] = useState([]);
  const linkId = useLocation().state.id;

  return (
    <>
      <h1 className='title text-4xl text-cust-silver'>View Article</h1>
    </>
  );
}

export default ViewArticle;
