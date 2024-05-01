import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-8 text-cust-english-violet'>
        <li>
          <Link
            to={'/articles'}
            className='hover:border-b-4 hover:border-b-cust-pumpkin hover:transition-all hover:ease-in-out'
          >
            Articles
          </Link>
        </li>
        <li>
          <Link
            to={'/about'}
            className='hover:border-b-4 hover:border-b-cust-pumpkin hover:transition-all hover:ease-in-out'
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
