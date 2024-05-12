import { Outlet } from 'react-router-dom';

function Articles({ className }) {
  return (
    <section className={className}>
      <Outlet />
    </section>
  );
}

export default Articles;
