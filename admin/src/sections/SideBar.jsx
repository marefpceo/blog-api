import Logo from '../assets/images/blog-api-logo.png';

function SideBar() {
  return (
    <aside
      className='z-10 row-span-2 row-start-1 flex flex-col items-center bg-cust-silver 
      text-cust-english-violet'
    >
      <div className='flex items-center gap-4 p-2'>
        <img src={Logo} alt='Site logo' className='max-h-12' />
        <h1 className='text-2xl'>BlogAPI Admin</h1>
      </div>
    </aside>
  );
}

export default SideBar;
