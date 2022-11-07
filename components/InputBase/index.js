import React, { useState } from "react";
import InputBaseStyles from "./InputBase.variant";

const Input = React.forwardRef(({ intent, icon, width, ...props }, ref) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={InputBaseStyles({ intent, width, focus })}>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="text-lg m-0 p-0.5 w-full outline-none bg-transparent"
        ref={ref}
        {...props}
      />
      {icon && <div className="mr-1 h-6 w-6 text-slate-500">{icon}</div>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
