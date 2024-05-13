function StatusCard({ title, count }) {
  return (
    <div
      className='flex h-32 w-56 flex-col items-center justify-center rounded-md bg-cust-silver text-cust-english-violet
        shadow-md shadow-cust-english-violet'
    >
      <h2 className='text-2xl'>{title}</h2>
      <p className='text-6xl'>{count}</p>
    </div>
  );
}

export default StatusCard;
