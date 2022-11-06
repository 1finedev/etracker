import ButtonStyles from "./Button.variants";

export default function Button({
  children,
  icon,
  intent,
  size,
  padding,
  onClick,
  disabled,
  loading,
  type = "button",
}) {
  const onClickHandler = (e) => {
    if (type === "submit") return;
    if (disabled || loading || !onClick) return e.preventDefault;
    onClick();
  };

  return (
    <button
      className={ButtonStyles({ intent, size, padding })}
      onClick={onClickHandler}
      type={type}
      disabled={disabled}
    >
      {icon && <div className="h-4 md:h-5 w-4 md:w-5">{icon}</div>}
      <span className="p-0">{loading ? "Please Wait" : children}</span>
    </button>
  );
}
