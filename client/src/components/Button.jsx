function Button({ className, text, type, style, onClick }) {
  return (
    <button
      className={`${className} active:scale-95`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
