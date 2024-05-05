import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

function FollowNav() {
  return (
    <div className='follow-nav flex gap-12'>
      <a href='https://www.facebook.com' target='_blank' rel='noreferrer'>
        <FontAwesomeIcon
          icon={faFacebook}
          size='xl'
          style={{ color: '#443850' }}
          className='transition-all duration-500 ease-in-out hover:scale-150'
        />
      </a>
      <a
        href='https://www.github.com/marefpceo'
        target='_blank'
        rel='noreferrer'
      >
        <FontAwesomeIcon
          icon={faGithub}
          size='xl'
          style={{ color: '#443850' }}
          className='transition-all duration-500 ease-in-out hover:scale-150'
        />
      </a>
      <a href='https://www.instagram.com' target='_blank' rel='noreferrer'>
        <FontAwesomeIcon
          icon={faInstagram}
          size='xl'
          style={{ color: '#443850' }}
          className='transition-all duration-500 ease-in-out hover:scale-150'
        />
      </a>
      <a href='https://www.twitter.com' target='_blank' rel='noreferrer'>
        <FontAwesomeIcon
          icon={faXTwitter}
          size='xl'
          style={{ color: '#443850' }}
          className='transition-all duration-500 ease-in-out hover:scale-150'
        />
      </a>
    </div>
  );
}

export default FollowNav;
