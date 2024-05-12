import Button from '../components/Button';

function Header() {
  return (
    <header
      className='z-10 col-start-2 row-start-1 flex items-center justify-end 
      bg-cust-silver text-cust-english-violet'
    >
      <span className='mr-12'>
        <Button
          className={
            'rounded-md border border-cust-slate-gray bg-cust-pumpkin px-4 py-1 text-cust-beige'
          }
          text={'Logout'}
        />
      </span>
    </header>
  );
}

export default Header;
