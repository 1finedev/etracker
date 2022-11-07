import { useEffect } from "react";
import { AlertDurationBarStyles, AlertStyles } from "./Alert.variant";

const Alert = ({ intent, style, label, close, duration }) => {
  useEffect(() => {
    const timer = setTimeout(close, duration);
    () => {
      clearTimeout(timer);
    };
  }, [close, duration]);

  return (
    <div className={AlertStyles({ intent })} style={style}>
      <p className="font-bold flex-1 mx-2">{label}</p>
      <button onClick={close} className="icon text-inherit">
        <img src="/closeIcon.svg" alt="close" />
      </button>
      {!!duration && duration > 0 && (
        <div
          className={AlertDurationBarStyles({ intent })}
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
};

export default Alert;
