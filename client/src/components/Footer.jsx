import FollowNav from '../features/FollowNav';

function Footer() {
  return (
    <footer className='my-12 flex flex-col items-center justify-center gap-8'>
      <FollowNav />
      <span>&copy;2024 L. Stevens</span>
    </footer>
  );
}

export default Footer;
