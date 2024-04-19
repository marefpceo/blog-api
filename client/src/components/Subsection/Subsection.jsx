import Card from '../Card/Card';
import './Subsection.css';

function Subsection({ className, title }) {
  return (
    <section className={`subsection ${className} rounded-lg shadow-md`}>
      <h2>{title}</h2>
      <div className='card-div'>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}

export default Subsection;
