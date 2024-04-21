import Nav from '../Nav/Nav';
import FollowNav from '../FollowNav/FollowNav';
import UserAccess from '../UserAcess/UserAccess';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header
      className='flex justify-between items-center h-20 p-2 rounded-b-lg shadow-md fixed 
      left-0 top-0 right-0 px-20 bg-green-200'
    >
      <h1>
        <Link to='/'>BlogAPI</Link>
      </h1>
      <Nav />
      <FollowNav />
      <UserAccess />
    </header>
  );
}

export default Header;
