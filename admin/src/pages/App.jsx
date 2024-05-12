import SideBar from '../sections/SideBar';
import Header from '../sections/Header';
import ContentArea from '../sections/ContentArea';

function App() {
  return (
    <div className=' m-0 grid h-screen w-screen grid-cols-layout grid-rows-layout p-0'>
      <Header
        className={
          'z-10 col-start-2 row-start-1 bg-cust-silver text-cust-english-violet'
        }
      />
      <SideBar
        className={
          'z-10 row-span-2 row-start-1 flex flex-col items-center bg-cust-silver text-cust-english-violet'
        }
      />
      <ContentArea
        className={
          'col-start-2 row-start-2 bg-cust-slate-gray p-4 text-cust-beige shadow-inner shadow-cust-english-violet'
        }
      />
    </div>
  );
}

export default App;
