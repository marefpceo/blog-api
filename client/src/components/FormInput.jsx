function FormInput({
  htmlFor,
  type,
  name,
  id,
  fieldname,
  handleInputChange,
  value,
}) {
  return (
    <label
      className='flex flex-col items-start leading-normal'
      htmlFor={htmlFor}
    >
      {fieldname}
      <input
        className='mt-1 min-w-96 rounded-md p-1 shadow-inner shadow-slate-400 focus:border-2 
          focus:border-green-500 focus:outline-none'
        type={type}
        name={name}
        id={id}
        onChange={handleInputChange}
        value={value}
        required
      />
    </label>
  );
}

export default FormInput;
