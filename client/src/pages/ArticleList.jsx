import { useOutletContext } from 'react-router-dom';
import Subsection from '../features/Subsection';

function ArticleList() {
  const { articles } = useOutletContext([]);

  return (
    <>
      <Subsection
        className={'articles'}
        articles={articles}
        title={'Articles'}
      />
    </>
  );
}

export default ArticleList;
