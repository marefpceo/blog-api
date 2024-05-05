import Nav from '../features/Nav';
import UserAccess from '../features/UserAccess';
import { Link } from 'react-router-dom';
import blogApiLogo from '../assets/images/blog-api-logo.png';
import { useState } from 'react';
import { useEffect } from 'react';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const [headerShadow, setHeaderShadow] = useState('');

  function handleScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 75) {
      setHeaderShadow('shadow-md shadow-cust-english-violet/20');
    } else {
      setHeaderShadow('');
    }
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 flex h-14 items-center justify-between 
        bg-slate-50 p-2 px-20 ${headerShadow} duration-400 transition-all ease-in`}
      >
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
    </>
  );
}

export default Header;
