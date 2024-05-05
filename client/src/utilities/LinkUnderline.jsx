function LinkUnderline() {
  return (
    <>
      {/* Ensure parent div has group and relative classes*/}
      <span
        className='absolute -bottom-1 left-1/2 h-0.5 w-0 bg-cust-pumpkin duration-500 
        group-hover:w-1/2 group-hover:transition-all'
      ></span>
      <span
        className='absolute -bottom-1 right-1/2 h-0.5 w-0 bg-cust-pumpkin duration-500 
        group-hover:w-1/2 group-hover:transition-all'
      ></span>
    </>
  );
}

export default LinkUnderline;
