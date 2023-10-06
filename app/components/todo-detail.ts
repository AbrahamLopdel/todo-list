import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Changeset } from 'ember-changeset';
import TodoService from 'todo-list/services/todo';
import { TodoType } from 'todo-list/types/todo';
import { TrackedObject } from 'tracked-built-ins';

interface TodoDetailsArgs {
  todo: TodoType;
}

export default class TodoDetailComponent extends Component<TodoDetailsArgs> {
  @service('todo') todoService!: TodoService;
  todoItem = new TrackedObject(this.args.todo);

  changeset = Changeset(this.todoItem);

  @action handleChangeTodo(ev: any) {
    ev.preventDefault();

    this.changeset[ev.target.name] = ev.target.value;
  }

  @action
  async handleSubmit(ev: any) {
    ev.preventDefault();
    await this.changeset.save();
    if (!this.changeset.changes.length) {
      this.todoService.editTodo(this.todoItem.id);
    }
  }
}
