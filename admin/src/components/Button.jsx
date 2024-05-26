function Button({ text, className, onClick, id, name }) {
  return (
    <button className={`active:scale-95 ${className}`} onClick={onClick} id={id} name={name}>
      {text}
    </button>
  );
}

export default Button;
