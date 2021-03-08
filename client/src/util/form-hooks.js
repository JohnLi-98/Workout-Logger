import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === "number"
          ? parseInt(event.target.value)
          : event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  const passwordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const confirmPasswordVisibility = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const resetLogSetValues = () => {
    setValues(initialState);
  };

  return {
    onChange,
    onSubmit,
    passwordVisibility,
    confirmPasswordVisibility,
    resetLogSetValues,
    values,
  };
};
