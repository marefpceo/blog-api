import { useOutletContext } from 'react-router-dom';
import blogImgPlaceholder from '../assets/images/blog-img-placeholder.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Article() {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getSelectedArticle() {
      try {
        const response = await fetch(`http://localhost:3000/articles/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let responseData = await response.json();

        setSelectedArticle(responseData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSelectedArticle(null);
      } finally {
        setLoading(false);
        console.log(selectedArticle);
      }
    }
    getSelectedArticle();
  }, []);

  return (
    <section className='mx-auto flex w-4/6 flex-1 flex-col items-center'>
      <div className='flex flex-col items-center'>
        <img src={blogImgPlaceholder} alt='' width={300} />
      </div>
      <div>
        <h1>{selectedArticle.article_title}</h1>
        <p>Written By: {selectedArticle.author}</p>
      </div>
      <div className='text'>
        {selectedArticle.article_text}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
        voluptatum ullam tenetur nihil incidunt aperiam ducimus sunt accusantium
        qui maiores cumque vel sapiente. Repellendus incidunt cumque quaerat
        possimus? Unde, repellat?
      </div>
    </section>
  );
}

export default Article;
