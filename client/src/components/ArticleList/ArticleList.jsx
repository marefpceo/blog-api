import { useOutletContext } from 'react-router-dom';
import Subsection from '../Subsection/Subsection';

function Articles() {
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

export default Articles;
