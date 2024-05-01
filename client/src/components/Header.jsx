import Nav from '../features/Nav';
import UserAccess from '../features/UserAccess';
import { Link } from 'react-router-dom';
import blogApiLogo from '../assets/images/blog-api-logo.png';

function Header({ isAuthenticated, setIsAuthenticated }) {
  return (
    <header className='fixed left-0 right-0 top-0 flex h-14 items-center justify-between bg-slate-50 p-2 px-20'>
      <Link
        to='/'
        className='flex items-end justify-between text-cust-english-violet'
      >
        <img src={blogApiLogo} alt='Site logo' className='max-h-11' />
        <h1>BlogAPI</h1>
      </Link>
      <Nav />
      <UserAccess
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </header>
  );
}

export default Header;
