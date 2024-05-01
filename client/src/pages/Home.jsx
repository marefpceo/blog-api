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
        className={''}
        title={'Recent Articles'}
        articles={recentArticles}
      />
      <Subsection className={''} title={'Top Picks'} articles={articles} />
    </>
  );
}

export default Home;
