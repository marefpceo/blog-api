function FormInput({
  htmlFor,
  type,
  name,
  id,
  fieldname,
  value,
  handleInputChange,
  autoFocus,
}) {
  return (
    <label
      className='mb-3 flex flex-col items-start leading-normal'
      htmlFor={htmlFor}
    >
      {fieldname}
      <input
        className='mt-1 min-w-96 rounded-md p-px shadow-inner shadow-slate-400 focus:border-2 
          focus:border-green-500 focus:outline-none'
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleInputChange}
        autoFocus={autoFocus}
        required
      />
    </label>
  );
}

export default FormInput;
