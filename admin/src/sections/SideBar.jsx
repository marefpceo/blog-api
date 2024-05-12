import logo from '../assets/images/blog-api-logo.png';
import AsideNav from '../components/AsideNav';

function SideBar() {
  return (
    <aside
      className='z-10 row-span-2 row-start-1 flex flex-col items-center bg-cust-silver 
      text-cust-english-violet'
    >
      <div className='mt-4 flex items-center gap-4 p-2'>
        <img src={logo} alt='Site logo' className='max-h-12' />
        <h1 className='text-2xl'>BlogAPI Admin</h1>
      </div>

      <div className='aside-nav-div mt-16 w-3/5'>
        <AsideNav />
      </div>
    </aside>
  );
}

export default SideBar;
