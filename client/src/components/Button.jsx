function Button({ className, text, type, style }) {
  return (
    <button className={className} type={type} style={style}>
      {text}
    </button>
  );
}

export default Button;
