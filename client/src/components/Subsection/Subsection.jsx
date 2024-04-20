import Card from '../Card/Card';
import './Subsection.css';

function Subsection({ className, title }) {
  return (
    <section
      className={`subsection ${className} rounded-lg shadow-md flex flex-col gap-8 my-8 py-8`}
    >
      <h2>{title}</h2>
      <div className='card-div flex justify-evenly'>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}

export default Subsection;
