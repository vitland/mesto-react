import { createContext, useState } from 'react';

export const FormValidationContext = createContext({
  formErrors: null,
  setFormErrors: () => null,
  btnStatus: null,
  setBtnStatus: () => null,
});

function FormContextProvider({ children }) {
  const [formErrors, setFormErrors] = useState({});
  const [btnStatus, setBtnStatus] = useState(false);

  function setFormError(name, value) {
    setFormErrors((prevFormErrors) => ({ ...prevFormErrors, [name]: value }));
  }

  function setButtonStatus(value) {
    setBtnStatus((prevValue) => {
      if (value === prevValue) {
        return prevValue
      }
      return value;
    });
  }

  return (
    <FormValidationContext.Provider
      value={{ formErrors, setFormError, btnStatus, setButtonStatus }}>
      {children}
    </FormValidationContext.Provider>
  );
}

export default FormContextProvider;
