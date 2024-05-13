function ArticleStatusCard({ title, total, draft, published, notPublished }) {
  return (
    <div
      className='flex h-60 w-96 flex-col items-center justify-center rounded-md bg-cust-silver pb-8 text-cust-english-violet
        shadow-md shadow-cust-english-violet'
    >
      <h2 className='mt-4 text-2xl'>{title}</h2>
      <div className='mt-4 flex w-full flex-1'>
        <div className='grid w-full grid-cols-2 grid-rows-2 items-center gap-4 text-center'>
          <div>
            <div>Total</div>
            <div className='text-3xl'>{total}</div>
          </div>
          <div>
            <div>Draft</div>
            <div className='text-3xl'>{draft}</div>
          </div>
          <div>
            <div>Published</div>
            <div className='text-3xl'>{published}</div>
          </div>
          <div>
            <div>Not Published</div>
            <div className='text-3xl'>{notPublished}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleStatusCard;
