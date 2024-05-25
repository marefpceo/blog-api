import CommentSection from './CommentSection';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import convertEscape from '../utilities/helpers';

function ArticleSection() {
  const { selectedArticle, articleComments } = useOutletContext([]);
  const [articleText, setArticleText] = useState();

  useEffect(() => {
    const convertedText = { __html: convertEscape(selectedArticle.article_text)};
    setArticleText(convertedText);
  }, [])


  return (
    <>
      <section className='article mx-auto mb-32 flex w-4/6 flex-1 flex-col items-center'>
        <div className='mb-16 flex flex-col items-center'>
          <img src={`http://localhost:3000/${selectedArticle.main_image}`} alt='' width={300}/>
        </div>
        {selectedArticle && (
          <>
            <div className='article-header self-start text-left'>
              <h1>{convertEscape(selectedArticle.article_title)}</h1>
              <p>Written By: {selectedArticle.author}</p>
              <p>Published: {selectedArticle.date_published}</p>
            </div>
            <div className='text'>
              <p className='mt-8 text-left'
                dangerouslySetInnerHTML={articleText}
              >
                {/* {articleText} */}
              </p>
            </div>
          </>
        )}
      </section>
      <CommentSection articleComments={articleComments} />
    </>
  );
}

export default ArticleSection;
