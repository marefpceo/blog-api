function Button({ text, className }) {
  return <button className={`active:scale-95 ${className}`}>{text}</button>;
}

export default Button;
