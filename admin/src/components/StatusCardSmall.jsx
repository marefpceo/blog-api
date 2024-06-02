function StatusCardSmall({ title, count }) {
  return (
    <div
      className='flex h-32 w-56 flex-col items-center justify-center rounded-md bg-cust-silver 
        text-cust-english-violet shadow-md shadow-cust-english-violet transition-all 
        duration-300 ease-in-out hover:shadow-cust-pumpkin/70'
    >
      <h2 className='text-2xl'>{title}</h2>
      <p className='text-6xl'>{count}</p>
    </div>
  );
}

export default StatusCardSmall;
