import LoadingSpinner from "../LoadingSpinner";
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
      <div className="w-fit">
        {
          !loading ?
            (
              <>
                {!!icon && <img src={buttonIcon} className="w-10 h-full" />}
              </>
            )
            :
            (
              <LoadingSpinner />
            )
        }
      </div>
      <span className="p-0">{loading ? "Please Wait" : children}</span>
    </button>
  );
}
