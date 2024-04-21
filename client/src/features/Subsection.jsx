import Card from '../components/Card';

function Subsection({ className, title, articles }) {
  return (
    <section
      className={`subsection ${className} flex flex-col gap-8 my-8 py-8`}
    >
      <h2>{title}</h2>
      <div className='card-div flex justify-evenly'>
        {articles.map((article) => (
          <Card key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default Subsection;
