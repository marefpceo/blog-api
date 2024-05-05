import { Link } from 'react-router-dom';
import LinkUnderline from '../utilities/LinkUnderline';

function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-8 text-cust-english-violet'>
        <li>
          <Link to={'/articles'} className='group relative'>
            <span>Articles</span>
            <LinkUnderline />
          </Link>
        </li>
        <li>
          <Link to={'/about'} className='group relative'>
            <span>About</span>
            <LinkUnderline />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
