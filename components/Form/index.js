import { useEffect, useState, createContext, useRef, useContext } from "react";
import { useAlert } from "../../Context/AlertContext";
export const FormContext = createContext(null);

export default function Form({ schema, onSubmit, children, ...others }) {
  const { addAlert } = useAlert();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  // const validateRef = useRef(false);

  const updateValue = (key, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (formData.validateForm) {
      Object.keys(values).forEach((key) => {
        if (
          formData.validateForm[key] &&
          formData.validateForm[key](values[key])
        ) {
          newErrors[key] = formData.validateForm[key](values[key]);
        } else {
          delete newErrors[key];
        }
      });
    }

    setErrors(newErrors);
  };

  // useEffect(() => {
  //   if (!validateRef.current) {
  //     validateRef.current = true;
  //     validate();
  //     return;
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [values]);
  // alert context doesn't exist
  // if (Object.keys(errors).length > 0) {
  //   alertContext.addAlert({
  //     type: "warning",
  //     label: "Please check your inputs",
  //   });
  //   return;
  // }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { error, value } = schema.validate({ ...values });
    // error is a string, should be an object so I can update the error state and it would be displayed in the UI

    addAlert({
      intent: "error",
      label: error.message,
    });
    console.log(error);
    // console.log(values);
    onSubmit(value);
  };

  const formValue = {
    values,
    updateValue,
    errors,
  };

  return (
    <FormContext.Provider value={formValue}>
      <form onSubmit={onFormSubmit} {...others}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export const useForm = () => useContext(FormContext);
