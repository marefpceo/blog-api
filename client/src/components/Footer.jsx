import FollowNav from '../features/FollowNav';

function Footer() {
  return (
    <footer
      className='mt-12 flex flex-col items-center justify-center gap-8 border-t 
    border-t-cust-english-violet/40 py-12'
    >
      <FollowNav />
      <span>&copy;2024 L. Stevens</span>
    </footer>
  );
}

export default Footer;
