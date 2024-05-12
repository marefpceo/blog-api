import { useState } from 'react';
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
        <li>Dashboard</li>
        <li className='flex cursor-pointer flex-col items-center justify-between'>
          <div
            onClick={handleClick}
            className='relative flex w-full items-center justify-between'
          >
            <span>Articles</span>
            {showMenu === false ? (
              <FontAwesomeIcon
                icon={faSortUp}
                size='xl'
                style={{ color: '#ea7317' }}
                className='absolute right-1 top-1 transition-all duration-500'
              />
            ) : (
              <FontAwesomeIcon
                icon={faSortDown}
                size='xl'
                style={{ color: '#443850' }}
                className='absolute bottom-1 right-1 transition-all duration-500'
              />
            )}
          </div>
          {showMenu === false ? (
            ''
          ) : (
            <ul className='-ml-20 space-y-2 pt-4'>
              <li>All</li>
              <li>Published</li>
              <li>UnPublished</li>
              <li>Create New</li>
            </ul>
          )}
        </li>
        <li>Users</li>
      </ul>
    </nav>
  );
}

export default AsideNav;
