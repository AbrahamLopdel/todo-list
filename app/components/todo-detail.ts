import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Changeset } from 'ember-changeset';
import TodoService from 'todo-list/services/todo';
import { TrackedObject } from 'tracked-built-ins';

export default class TodoDetailComponent extends Component {
  @service('todo') todoService!: TodoService;
  todo = new TrackedObject((this.args as any).todo);

  changeset: any = Changeset(this.todo);

  @action handleChangeTodo(ev: any) {
    ev.preventDefault();

    this.changeset[ev.target.name] = ev.target.value;
  }

  @action
  async handleSubmit(ev: any) {
    ev.preventDefault();
    await this.changeset.save();
    if (!this.changeset.changes.length) {
      this.todoService.editTodo(this.todo.id);
    }
  }
}
