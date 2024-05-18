import imgPlaceholder from '../assets/images/blog-img-placeholder.png';

function Create() {
  return (
    <>
      <h1 id='title' className='title text-4xl text-cust-silver'>
        Create Article
      </h1>
      <article className='mx-auto mt-12 flex h-3/4 w-4/6 flex-col justify-start bg-slate-100 text-black'>
        <div className='main-image mb-16 h-56 w-full'>
          <img
            src={imgPlaceholder}
            alt='Main image placeholder'
            className='mx-auto h-full w-2/3'
          />
        </div>
        <div>
          <h2 id='title'>Article Title</h2>
        </div>
      </article>
    </>
  );
}

export default Create;
