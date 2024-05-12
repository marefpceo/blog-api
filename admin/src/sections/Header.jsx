import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.clear();
    navigate(0);
  }

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
          onClick={handleClick}
        />
      </span>
    </header>
  );
}

export default Header;
