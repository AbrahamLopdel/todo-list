import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Changeset } from 'ember-changeset';
import TodoService from 'todo-list/services/todo';
import { TodoType } from 'todo-list/types/todo';

interface TodoDetailArgs {
  todo: TodoType;
}

export default class TodoDetailComponent extends Component<TodoDetailArgs> {
  @service('todo') todoService!: TodoService;

  changeset = Changeset(this.args.todo);

  @action handleChangeTodo(ev: any) {
    ev.preventDefault();

    this.changeset[ev.target.name] = ev.target.value;
  }

  @action
  async handleSubmit(ev: any) {
    ev.preventDefault();

    this.changeset.set('id', this.args.todo.id);
    await this.changeset.save();

    if (!this.changeset.changes.length) {
      console.log(this.args.todo);

      this.todoService.editTodo({ ...this.args.todo });
    }
  }
}
