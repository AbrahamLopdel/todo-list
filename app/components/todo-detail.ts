import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import TodoService from 'todo-list/services/todo';
import moment from 'moment';
import { TodoType } from 'todo-list/types/todo';
import { tracked } from '@glimmer/tracking';

interface TodoDetailArgs {
  todo: TodoType;
}

const daysAllowedForNotification = new Map([
  ['oneDay', 1],
  ['threeDays', 3],
  ['week', 7],
  ['month', 30],
]);

export default class TodoDetailComponent extends Component<TodoDetailArgs> {
  @service('todo') todoService!: TodoService;
  today;
  @tracked currentDueDate: Date;
  oldDueDate: Date;

  constructor(owner: unknown, args: TodoDetailArgs) {
    super(owner, args);
    this.today = moment().format('YYYY-MM-DD');
    this.currentDueDate = args.todo.todoDueDate!;
    this.oldDueDate = args.todo.todoDueDate!;
  }

  @action
  handleInputChangeDueDate(ev: InputEvent) {
    const inputElement = ev.target as HTMLInputElement;
    this.currentDueDate = new Date(inputElement.value);
  }

  //#region Todo Edition
  validateInput(inputElement: HTMLInputElement): boolean {
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity('Element Missed');
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.checkValidity()) {
      inputElement.reportValidity();
      return false;
    }

    return true;
  }

  normalizeNotificationObject(inputEl: HTMLInputElement, values: TodoType) {
    let formValues!: TodoType;
    const targetName = inputEl.name;
    if (targetName.includes('notification')) {
      // Enters just if input is a checkbox of notifcication
      const valueNotif = targetName.split('.')[1];

      formValues = {
        ...formValues,
        todoNotification: {
          ...values.todoNotification,
          [valueNotif as string]: inputEl.checked,
        },
      };
    } else {
      formValues = {
        ...formValues,
        [inputEl.name]: inputEl.value,
      };
    }

    return formValues;
  }

  removeOutdateNotifications() {
    //  It changes notifications to false if it was true, but date is less than neccesary to display that notification
    const diffDays = moment(this.args.todo.todoDueDate).diff(
      this.today,
      'days'
    );
    for (const [nameNotification, numberOfDays] of daysAllowedForNotification) {
      if (this.args.todo.todoNotification) {
        const thereIsANotification: boolean =
          !!this.args.todo.todoNotification[
            nameNotification as keyof typeof this.args.todo.todoNotification
          ];
        if (thereIsANotification && numberOfDays > diffDays) {
          this.args.todo.todoNotification[
            nameNotification as keyof typeof this.args.todo.todoNotification
          ] = false;
        }
      }
    }
  }

  @action
  async handleEdit(ev: Event) {
    ev.preventDefault();
    const inputElement = ev.target as HTMLInputElement;

    const isValid = this.validateInput(inputElement);

    if (isValid) {
      const form = document.getElementById(
        'todo_detail_form'
      ) as HTMLFormElement;

      let formValues!: TodoType;
      for (const input of form) {
        const inputElement = input as HTMLInputElement;
        formValues = {
          ...formValues,
          ...this.normalizeNotificationObject(inputElement, formValues),
        };
      }

      if (inputElement.name == 'todoDueDate') {
        this.removeOutdateNotifications();
      }

      const id: string = this.args.todo.id;
      const todoChecked: boolean = this.args.todo.todoChecked;
      formValues = { ...formValues, id, todoChecked };

      this.todoService.editTodo(formValues);
    }
  }
  //#endregion

  //#region Using changeset

  @action
  handleChangeTodo(ev: InputEvent) {
    ev.preventDefault();

    if (!ev.target) {
      return;
    }

    const inputEl = ev.target as HTMLInputElement;
    const targetName = inputEl.name;
    if (targetName.includes('notification')) {
      // Enters just if input is a checkbox of notifcication
      const valueNotif = targetName.split('.')[1];

      // this.args.todoChangeset.set(
      //   `todoNotification.${valueNotif}`,
      //   inputEl.checked
      // );
    } else {
      // this.args.todoChangeset.set(targetName, inputEl.value);
    }

    if (targetName === 'todoDueDate') {
      //  It changes notifications to false if it was true, but date is less than neccesary to display that notification
      // const diffDays = moment(this.args.todoChangeset.get('todoDueDate')).diff(
      //   this.today,
      //   'days'
      // );
      for (const [
        nameNotification,
        numberOfDays,
      ] of daysAllowedForNotification) {
        // const thereIsANotification = this.args.todoChangeset.get(
        //   `todoNotification.${nameNotification}`
        // );
        // if (thereIsANotification && numberOfDays > diffDays) {
        //   this.args.todoChangeset.set(
        //     `todoNotification.${nameNotification}`,
        //     false
        //   );
        // }
      }
    }
  }

  @action
  async editFormSubmit(ev: Event) {
    ev.preventDefault();

    // await this.args.todoChangeset.save();

    // if (!this.args.todoChangeset.changes.length) {
    //   this.todoService.editTodo(this.args.todoChangeset.data as TodoType);
    // }
  }
  //#endregion

  get dueDate() {
    if (this.oldDueDate != this.args.todo.todoDueDate) {
      this.oldDueDate = this.args.todo.todoDueDate!;
      return this.args.todo.todoDueDate;
    }

    return this.currentDueDate;
  }
}
