import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { EmberChangeset } from 'ember-changeset';
import TodoService from 'todo-list/services/todo';
import moment from 'moment';
import { TodoType } from 'todo-list/types/todo';

interface TodoDetailArgs {
  todoChangeset: EmberChangeset;
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

  constructor(owner: unknown, args: TodoDetailArgs) {
    super(owner, args);
    this.today = moment().format('YYYY-MM-DD');
  }

  @action
  handleChangeTodo(ev: any) {
    ev.preventDefault();

    const targetName = ev.target.name;
    if (targetName.includes('notification')) {
      // Enters just if input is a checkbox of notifcication
      const valueNotif = targetName.split('.')[1];

      this.args.todoChangeset.set(
        `todoNotification.${valueNotif}`,
        ev.target.checked
      );
    } else {
      this.args.todoChangeset.set(targetName, ev.target.value);
    }

    if (targetName === 'todoDueDate') {
      //  It changes notifications to false if it was true, but date is less than neccesary to display that notification
      const diffDays = moment(this.args.todoChangeset.get('todoDueDate')).diff(
        this.today,
        'days'
      );
      for (const [
        nameNotification,
        numberOfDays,
      ] of daysAllowedForNotification) {
        const thereIsANotification = this.args.todoChangeset.get(
          `todoNotification.${nameNotification}`
        );

        if (thereIsANotification && numberOfDays > diffDays) {
          this.args.todoChangeset.set(
            `todoNotification.${nameNotification}`,
            false
          );
        }
      }
    }
  }

  @action
  async handleSubmit(ev: any) {
    ev.preventDefault();

    await this.args.todoChangeset.save();

    if (!this.args.todoChangeset.changes.length) {
      this.todoService.editTodo(this.args.todoChangeset.data as TodoType);
    }
  }
}
