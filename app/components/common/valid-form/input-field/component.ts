import { action } from '@ember/object';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import validateInput, {
  ErrorCustomValidation,
} from 'todo-list/utils/validations';

enum InputType {
  Checkbox = 'checkbox',
  Date = 'date',
  Text = 'text',
  Textarea = 'textarea',
}

interface InputFieldArgs {
  customValidationMessages:
    | ErrorCustomValidation
    | Array<ErrorCustomValidation>;
  locator: string;
  minDate?: string;
  name: string;
  placeholder?: string;
  type: InputType;
  value: string | Date | boolean;
  handleCheckValid: (isValid: boolean) => {};
  handleInputChange?: void | null;

  //  Error validations
  required: boolean;
  minlength: number;
  maxlength: number;
}

export default class InputFieldComponent extends Component<InputFieldArgs> {
  @tracked isValid: boolean = true;
  errorCustomValidation: ErrorCustomValidation | Array<ErrorCustomValidation>;

  constructor(owner: Owner, args: InputFieldArgs) {
    super(owner, args);

    this.errorCustomValidation = args.customValidationMessages || {};
  }

  get handleChange() {
    if (!this.args.handleInputChange) {
      return () => {};
    }

    return this.args.handleInputChange;
  }

  @action
  checkValidations(ev: Event) {
    ev.preventDefault();
    const inputElement = ev.target as HTMLInputElement;

    this.isValid = validateInput(
      inputElement,
      this.args.customValidationMessages
    );

    this.args.handleCheckValid(this.isValid);
  }
}
