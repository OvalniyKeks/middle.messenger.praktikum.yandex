import { default as isValid, errorsText } from './validate';

export class FormFn {
  static getFields(nameForm: string) {
    const form = document.querySelector(`form[data-id="${nameForm}"]`);
    const formElements = Array.from((form as HTMLFormElement).elements);

    const fields = formElements.filter((element) => element.tagName === 'INPUT');
    return fields;
  }

  static getField(nameField: string) {
    return (document.getElementsByName(nameField)[0] as HTMLInputElement);
  }

  static checkForm(nameForm: string) {
    const fields = this.getFields(nameForm);

    let isError: boolean = false;

    fields.forEach((element) => {
      const resultCheck = this.checkField(element.getAttribute('name'));
      if (!resultCheck) {
        isError = true;
      }
    });

    if (isError) {
      return false;
    }
    return true;
  }

  static resetForm(name: string) {
    this.getFields(name).map(input => {
			(input as HTMLInputElement).value = ''
		});
  }

  static checkField(name: string | null) {
    if (!name) {
      return;
    }
    const { value } = this.getField(name);

    if (name === 'repeatPassword') {
      const originPasswordField = this.getField('password').value;
      if (!originPasswordField) {
        return;
      }
      if (!isValid(name, value, originPasswordField)) {
        this.addError(name);
        return false;
      }
    }

    if (!isValid(name, value)) {
      this.addError(name);
      return false;
    }
    return true;
  }

  static addError(name: string | null) {
    if (!name) {
      return;
    }

    const element = this.getField(name);
    element.insertAdjacentElement('afterend', this.createError(name));
  }

  static deleteError(name: string | null) {
    if (!name) {
      return;
    }

    const element = this.getField(name);
    const elementError = element.nextElementSibling;
    if (elementError && elementError.className === 'form-error') {
      elementError.remove();
    }
  }

  static createError(nameField: string) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('form-error');
    errorElement.setAttribute('data-error', 'true');
    errorElement.textContent = (errorsText as any)[nameField];
    return errorElement;
  }
}
