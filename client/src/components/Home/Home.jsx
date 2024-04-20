import Featured from '../Featured/Featured';
import Subsection from '../Subsection/Subsection';
import { useOutletContext } from 'react-router-dom';

function Home() {
  const { articles } = useOutletContext([]);

  return (
    <>
      <Featured articles={articles} />
      <Subsection
        className={'bg-indigo-200'}
        title={'Recent Articles'}
        articles={articles}
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
