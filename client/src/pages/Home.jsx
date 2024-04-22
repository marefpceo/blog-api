import Featured from '../features/Featured';
import Subsection from '../features/Subsection';
import { useOutletContext } from 'react-router-dom';

function Home() {
  const { articles } = useOutletContext([]);
  const { featuredArticle } = useOutletContext();
  const { recentArticles } = useOutletContext([]);

  return (
    <>
      <Featured featuredArticle={featuredArticle} />
      <Subsection
        className={'bg-indigo-200'}
        title={'Recent Articles'}
        articles={recentArticles}
      />
      <Subsection
        className={'bg-emerald-200'}
        title={'Top Picks'}
        articles={articles}
      />
    </>
  );
}

export default Home;
