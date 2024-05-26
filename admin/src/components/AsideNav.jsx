import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';

function AsideNav() {
  const [showMenu, setShowMenu] = useState(false);

  function handleClick() {
    showMenu === false ? setShowMenu(true) : setShowMenu(false);
  }

  return (
    <nav className='w-full text-xl'>
      <ul className='space-y-4'>
        <li>
          <Link to='/' className='hover:text-cust-pumpkin'>
            Dashboard
          </Link>
        </li>

        <li className='flex cursor-pointer flex-col items-center justify-between'>
          <div
            onClick={handleClick}
            className='relative flex w-full items-center justify-between'
          >
            <span>Articles</span>
            {showMenu === false ? (
              <FontAwesomeIcon
                icon={faSortDown}
                size='xl'
                style={{ color: '#ea7317' }}
                className='absolute bottom-1 right-1 transition-all duration-500'
              />
            ) : (
              <FontAwesomeIcon
                icon={faSortUp}
                size='xl'
                style={{ color: '#443850' }}
                className='absolute right-1 top-1 transition-all duration-500'
              />
            )}
          </div>
          {showMenu === false ? (
            ''
          ) : (
            <ul className='-ml-20 space-y-2 pt-4'>
              <li>
                <Link to='/articles' className='hover:text-cust-pumpkin'>
                  All
                </Link>
              </li>
              <li>
                <Link
                  to='/articles/published'
                  className='hover:text-cust-pumpkin'
                >
                  Published
                </Link>
              </li>
              <li>
                <Link
                  to='/articles/nonpublished'
                  className='hover:text-cust-pumpkin'
                >
                  UnPublished
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to='/create' className='hover:text-cust-pumpkin'>
            Create New Article
          </Link>
        </li>
        <li>
          <Link to='/edit' className='hover:text-cust-pumpkin'>
            Edit Article
          </Link>
        </li>
        <li>
          <Link to='/users' className='hover:text-cust-pumpkin'>
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AsideNav;
