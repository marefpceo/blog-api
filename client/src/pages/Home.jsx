import Featured from '../features/Featured';
import Subsection from '../features/Subsection';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  const { articles } = useOutletContext([]);
  const { featuredArticle } = useOutletContext();
  const { recentArticles } = useOutletContext([]);

  useEffect(() => {
    async function visitCount() {
      try {
        const response = await fetch('http://localhost:3000/articles/count');
        if (response.ok) {
          console.log('Site visit logged');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    visitCount();
  }, []);

  return (
    <>
      <Featured featuredArticle={featuredArticle} />
      <Subsection
        className={''}
        title={'Recent Articles'}
        articles={recentArticles}
      />
      <Subsection className={''} title={'Top Picks'} articles={articles} />
    </>
  );
}

export default Home;
