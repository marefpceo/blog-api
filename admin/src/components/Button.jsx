function Button({ text, className, onClick }) {
  return (
    <button className={`active:scale-95 ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
