export class ValidateForm {
  constructor() {}

  checkLength(min, max, inputElement) {
    return inputElement.value.length >= min && inputElement.value.length <= max;
  }

  checkEmail(inputElement) {
    const input = inputElement.value.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(input);
  }

  clearInput(inputElement) {
    inputElement.value = "";
  }
}
