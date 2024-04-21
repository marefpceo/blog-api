import facebookIcon from '../assets/images/facebook.png';
import githubIcon from '../assets/images/github.png';
import instagramIcon from '../assets/images/instagram.png';
import xTwitterIcon from '../assets/images/x-twitter.png';

function FollowNav() {
  return (
    <div className='follow-nav flex gap-4'>
      <a href='https://www.facebook.com' target='_blank' rel='noreferrer'>
        <img src={facebookIcon} alt='Facebook Icon' className='w-5 h-5' />
      </a>
      <a
        href='https://www.github.com/marefpceo'
        target='_blank'
        rel='noreferrer'
      >
        <img src={githubIcon} alt='Github Icon' className='w-5 h-5' />
      </a>
      <a href='https://www.instagram.com' target='_blank' rel='noreferrer'>
        <img src={instagramIcon} alt='Instagram Icon' className='w-5 h-5' />
      </a>
      <a href='https://www.twitter.com' target='_blank' rel='noreferrer'>
        <img src={xTwitterIcon} alt='X Twitter Icon' className='w-5 h-5' />
      </a>
    </div>
  );
}

export default FollowNav;
