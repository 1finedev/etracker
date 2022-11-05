import React, { useContext } from 'react';
import { FormContext } from '.';
import Input from '../InputBase';

export default function FormInput({ input, ...others }) {
    const { field, placeholder, label, type } = input;
    const formContext = useContext(FormContext);

    return (
        <div className="flex flex-col gap-y-0.5 md:gap-y-1">
            {
                label !== '' &&
                <div className="capitalize font-medium text-sm md:text-base">{label}:</div>
            }
            <Input
                value={formContext.values[field] || ''}
                onChange={(e) => formContext.updateValue(field, e.target.value)}
                placeholder={placeholder}
                type={type}
                {...others}
            />
            <div className="text-red-500 text-[10px] md:text-xs italic">{formContext.errors[field] || ''}</div>
        </div>
    )
}
