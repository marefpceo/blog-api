import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-8'>
        <li>
          <Link to={'/articles'}>Articles</Link>
        </li>
        <li>About</li>
        <li>Subscribe</li>
      </ul>
    </nav>
  );
}

export default Nav;