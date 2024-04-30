import Nav from '../features/Nav';
import UserAccess from '../features/UserAccess';
import { Link } from 'react-router-dom';

function Header({ isAuthenticated, setIsAuthenticated }) {
  return (
    <header
      className='fixed left-0 right-0 top-0 flex h-14 items-center justify-between 
      bg-beige p-2 px-20 shadow-md'
    >
      <h1>
        <Link to='/'>BlogAPI</Link>
      </h1>
      <Nav />
      <UserAccess
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </header>
  );
}

export default Header;
