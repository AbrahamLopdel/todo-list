import { action } from '@ember/object';
import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';

enum KindOfEvent {
  focusout = 'focusout',
  submit = 'submit',
}

interface ValidFormArgs {
  id: string;
  event: KindOfEvent;
  handleEdit: () => {};
}

export default class ValidFormComponent extends Component<ValidFormArgs> {
  formIsValid: boolean = false;
  kindOfEvent: KindOfEvent = KindOfEvent.submit;

  constructor(owner: Owner, args: ValidFormArgs) {
    super(owner, args);

    this.kindOfEvent = args.event;
  }

  @action
  onEdit(ev: Event) {
    ev.preventDefault();

    if (this.formIsValid) {
      this.args.handleEdit();
    }
  }

  @action
  checkIsValid(isValid: boolean) {
    this.formIsValid = isValid;
  }
}
