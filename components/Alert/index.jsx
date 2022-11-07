import { useEffect } from "react";
import { AlertDurationBarStyles } from "./Alert.variant";

const Alert = ({ intent, style, label, close, duration }) => {
    useEffect(() => {
        // const timer = setTimeout(close, duration);
        () => {
            clearTimeout(timer);
        };
    }, [close, duration]);

    return (
        <div className={"alert bg-white flex items-center transform -translate-x-1/2 max-w-[30rem] w-[90vw] h-16 rounded-md shadow-md overflow-hidden !z-[100000]"} style={style}>
            {!!duration && duration > 0 && (
                <div
                    className={AlertDurationBarStyles({ intent })}
                    style={{ animationDuration: `${duration}ms` }}
                />
            )}
            <p className="font-bold flex-1 mx-2">{label}</p>
            <button onClick={close} className="icon h-full px-4 text-xs text-slate-300 border border-l-slate-300">
                CLOSE
            </button>
        </div>
    );
};

export default Alert;
