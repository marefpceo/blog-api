function TextField({ htmlFor, type, name, id, fieldname }) {
  return (
    <label htmlFor={htmlFor}>
      {fieldname}
      <input type={type} name={name} id={id} required />
    </label>
  );
}

export default TextField;
