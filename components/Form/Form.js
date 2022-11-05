import { useContext, useEffect, useState, createContext, useRef } from "react";

export const FormContext = createContext(null);

export default function Form({ formData, onSubmit, children }) {
    const [values, setValues] = useState(formData.initialValues);
    const [errors, setErrors] = useState({});
    const validateRef = useRef(false);

    const updateValue = (key, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [key]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (formData.validateForm) {
            Object.keys(values).forEach(key => {
                if (formData.validateForm[key] && formData.validateForm[key](values[key])) {
                    newErrors[key] = formData.validateForm[key](values[key]);
                } else {
                    delete newErrors[key];
                }
            });
        };

        setErrors(newErrors);
    }

    useEffect(() => {
        if (!validateRef.current) {
            validateRef.current = true;
            return;
        };

        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        // console.log(Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            alertContext.addAlert({
                type: "warning",
                label: "Please check your inputs"
            })
            return;
        }
        onSubmit(values);
    }

    const formValue = {
        values,
        updateValue,
        setValues,
        errors,
        validate,
    }

    return (
        <FormContext.Provider value={formValue} >
            <form onSubmit={onFormSubmit} {...others}>
                {children}
            </form>
        </FormContext.Provider >
    );
};