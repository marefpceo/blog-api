import Nav from '../Nav/Nav';
import FollowNav from '../FollowNav/FollowNav';
import './Header.css';

function Header() {
  return (
    <header className='rounded-b-lg shadow-md fixed left-0 top-0 right-0'>
      <h1>BlogAPI</h1>
      <Nav />
      <FollowNav />
    </header>
  );
}

export default Header;
