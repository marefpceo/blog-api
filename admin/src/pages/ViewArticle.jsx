import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import convertEscape from '../utilites/helpers';
import LinkUnderline from '../utilites/LinkUnderline';

function ViewArticle() {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComment] = useState([]);
  const [articleText, setArticleText] = useState();
  const [dataSet, setDataSet] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getArticle() {
      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          fetch(`http://localhost:3000/admin/articles/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://localhost:3000/articles/${id}/comments`),
        ]);

        let articleResponseData = await articleResponse.json();
        let commentsResponseData = await commentsResponse.json();

        setArticle(articleResponseData.selectedArticle);
        setComment(commentsResponseData);
        setDataSet(true);
      } catch (error) {
        console.error(error, error.status);
      }
    }
    getArticle();
  }, []);

  useEffect(() => {
    if (dataSet === true) {
      const convertedText = {
        __html: convertEscape(article.article_text),
      };
      setArticleText(convertedText);
      setDataSet(false);
    } else {
      return;
    }
  }, [dataSet]);

  function handleOpenModal() {
    setShowModal(true);
    console.log(showModal);
  }

  function handleCloseModal() {
    setShowModal(false);
    console.log(showModal);
  }

  return (
    <section>
      <div className='mt-0 pt-4 w-full flex items-center justify-between sticky top-0 bg-cust-slate-gray'>
        <h1 className='title text-4xl text-cust-silver'>View Article</h1>
        <div className='flex gap-12 mr-8'>
          <div className='cursor-pointer group relative' onClick={handleOpenModal}>View/ Edit Comments
            <LinkUnderline 
              color={'bg-cust-pumpkin'}
            />
          </div>
          <Link to={`/edit/${id}`} state={{ id: id }} className='group relative'>
            Edit Article
            <LinkUnderline 
              color={'bg-cust-pumpkin'}
            />
          </Link>
          <Link to={-1} className='group relative'>
            Back
            <LinkUnderline 
              color={'bg-cust-pumpkin'}
            />
          </Link>
        </div>
      </div>

      <article className='article mx-auto mt-16 mb-32 px-8 flex w-4/6 flex-1 flex-col items-center 
        text-cust-english-violet bg-slate-50 relative'>
        <div className='mt-8 mb-16 flex flex-col items-center'>
            <img
              src={`http://localhost:3000/uploads/${article.main_image}`}
              alt=''
              width={300}
            />
          </div>

          <>
            <div className='article-header self-start text-left leading-loose'>
              <h1>{article.article_title}</h1>
              <p>Written By: {article.author}</p>
              <p>Published: {article.date_published}</p>
            </div>
            <div className='article-text mt-12 w-full'>
              <p
                className='text-left'
                dangerouslySetInnerHTML={articleText}
              ></p>
            </div>
          </>

      </article>
    </section>
  );
}

export default ViewArticle;
