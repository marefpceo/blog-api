function ArticleStatusCard({ title, total, draft, published, notPublished }) {
  return (
    <div
      className='flex h-56 w-96 flex-col items-center justify-center rounded-md bg-cust-silver text-cust-english-violet
        shadow-md shadow-cust-english-violet'
    >
      <h2 className='mt-4 text-2xl'>{title}</h2>
      <div className='flex flex-1'>
        <div className='grid grid-cols-2 grid-rows-2 items-center gap-8 text-center'>
          <div>Total</div>
          <div>Draft</div>
          <div>Published</div>
          <div>Not Published</div>
        </div>
      </div>
    </div>
  );
}

export default ArticleStatusCard;
