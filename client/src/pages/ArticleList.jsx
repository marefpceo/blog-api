import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import Subsection from '../features/Subsection';

function ArticleList() {
  const { articles } = useOutletContext([]);
  const { setRefreshList } = useOutletContext();

  useEffect(() => {
    setRefreshList(true);
  }, []);

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
