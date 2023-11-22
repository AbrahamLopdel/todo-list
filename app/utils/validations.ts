export interface ErrorCustomValidation {
  validationError?: string;
  customMessage?: string;
}

function setCustomValidityToInput(inputElement: HTMLInputElement) {
  return function setCustomValidity(validityName: string, customText: string) {
    if (
      inputElement.validity[validityName as keyof typeof inputElement.validity]
    ) {
      inputElement.setCustomValidity(customText);
    } else {
      inputElement.setCustomValidity('');
    }
  };
}

/**
 * This function validate the input field you pass as a parameter and sets the error text field
 * @param inputElement it is the element which we will validate
 * @returns if the input field is valid, returns true, else if return false
 */
const validateInput = (
  inputElement: HTMLInputElement,
  customValidations: ErrorCustomValidation | Array<ErrorCustomValidation> = {}
): boolean => {
  let isValid = true;

  const setValidity = setCustomValidityToInput(inputElement);

  if (Array.isArray(customValidations)) {
    for (const { validationError, customMessage } of customValidations) {
      setValidity(validationError!, customMessage!);
    }
  } else if (customValidations) {
    setValidity(
      customValidations.validationError!,
      customValidations.customMessage!
    );
  }

  const inputParent = inputElement.parentElement as HTMLElement;
  const textError = inputParent.querySelector('[id*="error"]'); //  We take the input's sibling which contains 'error' in its id
  if (textError?.textContent || textError?.textContent == '') {
    if (!inputElement.checkValidity()) {
      textError.textContent = inputElement.validationMessage;
      isValid = false;
    } else {
      textError.textContent = inputElement.validationMessage;
    }
  }

  return isValid;
};

export default validateInput;
