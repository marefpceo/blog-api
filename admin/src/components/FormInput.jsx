function FormInput({
  htmlFor,
  fieldName,
  type,
  name,
  id,
  className,
  autoFocus,
  onChange,
  value,
}) {
  return (
    <>
      <label htmlFor={htmlFor}>{fieldName}</label>
      <input
        type={type}
        name={name}
        id={id}
        className={`rounded-sm border border-cust-slate-gray/80 px-1 py-px shadow-inner 
          shadow-cust-slate-gray/50 focus:border-cust-pumpkin focus:outline-none ${className}`}
        autoFocus={autoFocus}
        onChange={onChange}
        value={value}
        required
      />
    </>
  );
}

export default FormInput;
