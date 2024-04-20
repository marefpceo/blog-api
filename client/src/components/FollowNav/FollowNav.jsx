import facebookIcon from '../../assets/images/facebook.png';
import githubIcon from '../../assets/images/github.png';
import instagramIcon from '../../assets/images/instagram.png';
import xTwitterIcon from '../../assets/images/x-twitter.png';

function FollowNav() {
  return (
    <div className='follow-nav flex gap-4'>
      <img src={facebookIcon} alt='Facebook Icon' className='w-6 h-6' />
      <img src={githubIcon} alt='Github Icon' className='w-6 h-6' />
      <img src={instagramIcon} alt='Instagram Icon' className='w-6 h-6' />
      <img src={xTwitterIcon} alt='X Twitter Icon' className='w-6 h-6' />
    </div>
  );
}

export default FollowNav;
