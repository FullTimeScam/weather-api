const Button = ({ name, isMoreButton }) => {
  return (
    <button
      className={`button-style ${isMoreButton && "inline-block md:hidden"}`}
    >
      {name}
    </button>
  );
};

export default Button;
