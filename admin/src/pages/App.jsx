import { Outlet } from 'react-router-dom';
import SideBar from '../sections/SideBar';
import Header from '../sections/Header';

function App() {
  return (
    <div className='m-0 grid h-screen w-screen grid-cols-layout grid-rows-layout p-0'>
      <Header />
      <SideBar />
      <div
        className='col-start-2 row-start-2 overflow-y-auto bg-cust-slate-gray pt-0 px-4 
        text-cust-beige border border-t-2 border-l-2 border-cust-english-violet/15'
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
