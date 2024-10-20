import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import convertEscape from '../utilites/helpers';
import LinkUnderline from '../utilites/LinkUnderline';
import CommentsModal from '../components/CommentsModal';
import Button from '../components/Button';

function ViewArticle() {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [comments, setComment] = useState([]);
  const [articleText, setArticleText] = useState();
  const [dataSet, setDataSet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [adminArticleDelete, setAdminArticleDelete] = useState(false);

  useEffect(() => {
    async function getArticle() {
      try {
        const [articleResponse, commentsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/admin/articles/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_BASE_URL}/articles/${id}/comments`),
        ]);

        let articleResponseData = await articleResponse.json();
        let commentsResponseData = await commentsResponse.json();

        setArticle(articleResponseData.selectedArticle);
        setComment(commentsResponseData.comments);
        setDataSet(true);
        setReloadData(false);
      } catch (error) {
        console.error(error, error.status);
      }
    }
    getArticle();
  }, [reloadData]);

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

  useEffect(() => {
    if (adminArticleDelete === false){ return };
    async function deleteArticle() {
      try {
        const deleteResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/articles/${id}`,{
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (deleteResponse.ok) {
          setAdminArticleDelete(false);
          navigate('/articles');
        }
      } catch (error) {
        console.error(error, error.status);
      }
    }
    deleteArticle();
  }, [adminArticleDelete]);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleClick() {
    setAdminArticleDelete(true);
  }

  return (
    <section className='relative'>
      <div className='mt-0 pt-4 w-full flex items-center justify-between sticky top-0 bg-cust-slate-gray z-20'>
        <h1 className='title text-4xl text-cust-silver'>View Article</h1>
        <>
          {
            showModal === true ? '' : (
              <Button
                text={'Delete'}
                className={'h-10 w-32 rounded-md bg-red-600 shadow-md shadow-cust-english-violet'}
                onClick={handleClick}
                id={'deleteBtn'}
                name={'deleteArticle'}
              />
            )
          }
        </>
        <div className='flex gap-12 mr-8'>
          
          {
            showModal === true ? '' : (
              <>
                <div className='cursor-pointer group relative' onClick={handleOpenModal}>
                  View/ Edit Comments
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
                    color={'bg-cust-pumpkin'} />
                </Link>
              </>
            )
          }
        </div>
      </div>

      {
        showModal === true ? (
          <CommentsModal 
            className='mt-16 mx-auto w-4/6 h-3/4 px-2 py-4 bg-cust-beige/20 relative rounded-md shadow-md 
              shadow-cust-english-violet/50'
            handleCloseModal={handleCloseModal}
            comments={comments}
            setReloadData={setReloadData}
          />
          ) : (
          <article className='article mx-auto mt-16 mb-32 px-8 flex w-4/6 flex-1 flex-col items-center 
          text-cust-english-violet bg-slate-50 relative'>
            <div className='mt-8 mb-16 flex flex-col items-center'>
                <img
                  src={`${article.main_image}`}
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
                <div className='article-text my-12 w-full'>
                  <p
                    className='text-left'
                    dangerouslySetInnerHTML={articleText}
                  ></p>
                </div>
              </>

          </article>
        )
      }
    </section>
  );
}

export default ViewArticle;
