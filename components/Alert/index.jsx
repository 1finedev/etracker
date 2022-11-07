import { useEffect } from "react";
import { AlertDurationBarStyles } from "./Alert.variant";

const Alert = ({ intent, style, label, close, duration }) => {
  useEffect(() => {
    const timer = setTimeout(close, duration);
    () => {
      clearTimeout(timer);
    };
  }, [close, duration]);

  return (
    <div
      className={
        "alert bg-white flex items-center transform -translate-x-1/2 max-w-[30rem] w-[90vw] h-16 rounded-md shadow-md overflow-hidden !z-[100000]"
      }
      style={style}
    >
      {!!duration && duration > 0 && (
        <div
          className={AlertDurationBarStyles({ intent })}
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
      <div className="flex flex-col justify-between py-2 px-4">
        <h5 className="font-semibold uppercase">{intent}</h5>
        <span className="text-slate-600 text-sm">{label}</span>
      </div>
      <button
        onClick={close}
        className="icon h-full px-4 text-xs text-slate-400 border border-l-slate-400 ml-auto"
      >
        CLOSE
      </button>
    </div>
  );
};

export default Alert;
