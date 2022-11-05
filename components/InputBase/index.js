import React, { useState } from 'react';
import InputBaseStyles from './InputBase.variant';

const Input = React.forwardRef(({ color, icon, width, ...props }, ref) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className={InputBaseStyles({ color, width, focus })}>
            {
                icon &&
                <div className="h-6 w-6 text-slate-500">
                    {icon}
                </div>
            }
            <input
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className="text-lg m-0 p-0.5 w-full outline-none bg-transparent"
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default Input;