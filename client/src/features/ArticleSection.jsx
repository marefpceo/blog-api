import CommentSection from './CommentSection';
import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useOutletContext } from 'react-router-dom';

function ArticleSection() {
  const { selectedArticle, articleComments } = useOutletContext([]);

  return (
    <>
      <section className='article mx-auto mb-32 flex w-4/6 flex-1 flex-col items-center'>
        <div className='mb-16 flex flex-col items-center'>
          <img src={blogImgPlaceholder} alt='' width={300} />
        </div>
        {selectedArticle && (
          <>
            <div className='article-header self-start text-left'>
              <h1>{selectedArticle.article_title}</h1>
              <p>Written By: {selectedArticle.author}</p>
              <p>Published: {selectedArticle.date_published}</p>
            </div>
            <div className='text'>
              <p className='mt-8 text-left'>
                {selectedArticle.article_text}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, voluptatum ullam tenetur nihil incidunt aperiam
                ducimus sunt accusantium qui maiores cumque vel sapiente.
                Repellendus incidunt cumque quaerat possimus? Unde, repellat?
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, tenetur tempore! Tempore dolorem pariatur
                necessitatibus dicta rerum quas fugiat nesciunt tenetur, qui
                nihil deserunt reprehenderit culpa ducimus distinctio, nemo
                dolor. Quas quod dolorum earum pariatur accusamus, iusto
                aspernatur sunt aperiam a laudantium reprehenderit autem iste
                obcaecati quos fuga. Minima, officiis?
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
