import { Outlet } from 'react-router-dom';
import SideBar from '../sections/SideBar';
import Header from '../sections/Header';

function App() {
  return (
    <div className='m-0 grid h-screen w-screen grid-cols-layout grid-rows-layout p-0'>
      <Header />
      <SideBar />
      <div
        className='col-start-2 row-start-2 overflow-y-auto bg-cust-slate-gray p-4 
        text-cust-beige shadow-inner shadow-cust-english-violet'
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
