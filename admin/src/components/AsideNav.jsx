import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';

function AsideNav() {
  const [showMenu, setShowMenu] = useState(false);

  function handleClick() {
    if (showMenu === false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <nav className='w-full text-xl'>
      <ul>
        <li>Dashboard</li>
        <li
          onClick={handleClick}
          className='flex cursor-pointer items-center justify-between'
        >
          Articles
          {showMenu === false ? (
            <FontAwesomeIcon
              icon={faSortUp}
              size='xl'
              style={{ color: '#ea7317' }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faSortDown}
              size='xl'
              style={{ color: '#443850' }}
            />
          )}
          {showMenu === false ? (
            ''
          ) : (
            <ul>
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
