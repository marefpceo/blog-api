import facebookIcon from '../../assets/images/facebook.png';
import githubIcon from '../../assets/images/github.png';
import instagramIcon from '../../assets/images/instagram.png';
import xTwitterIcon from '../../assets/images/x-twitter.png';

import './FollowNav.css';

function FollowNav() {
  return (
    <div className='follow-nav'>
      <img src={facebookIcon} alt='Facebook Icon' />
      <img src={githubIcon} alt='' />
      <img src={instagramIcon} alt='' />
      <img src={xTwitterIcon} alt='' />
    </div>
  );
}

export default FollowNav;
