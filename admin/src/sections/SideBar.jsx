import Logo from '../assets/images/blog-api-logo.png';

function SideBar({ className }) {
  return (
    <aside className={className}>
      <div className='flex items-center gap-4 p-2'>
        <img src={Logo} alt='Site logo' className='max-h-12' />
        <h1 className='text-2xl'>BlogAPI Admin</h1>
      </div>
    </aside>
  );
}

export default SideBar;
