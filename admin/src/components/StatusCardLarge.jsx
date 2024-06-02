function StatusCardLarge({
  title,
  statusText1,
  statusValue1,
  statusText2,
  statusValue2,
  statusText3,
  statusValue3,
  statusText4,
  statusValue4,
}) {
  return (
    <div
      className='flex h-60 w-96 flex-col items-center justify-center rounded-md bg-cust-silver pb-8 
        text-cust-english-violet shadow-md shadow-cust-english-violet transition-all 
        duration-300 ease-in-out hover:shadow-cust-pumpkin/70'
    >
      <h2 className='mt-4 text-2xl'>{title}</h2>
      <div className='mt-4 flex w-full flex-1'>
        <div className='grid w-full grid-cols-2 grid-rows-2 items-center gap-4 text-center'>
          <div>
            <div>{statusText1}</div>
            <div className='text-3xl'>{statusValue1}</div>
          </div>
          <div>
            <div>{statusText2}</div>
            <div className='text-3xl'>{statusValue2}</div>
          </div>
          <div>
            <div>{statusText3}</div>
            <div className='text-3xl'>{statusValue3}</div>
          </div>
          <div>
            <div>{statusText4}</div>
            <div className='text-3xl'>{statusValue4}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusCardLarge;
