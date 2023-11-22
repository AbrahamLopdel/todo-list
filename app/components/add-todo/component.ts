import Component from '@glimmer/component';
import { Changeset } from 'ember-changeset';
import TodoService from 'todo-list/services/todo';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class AddTodoComponent extends Component {
  @service('todo') todoService!: TodoService;

  todo = {
    todoTitle: '',
  };

  changeset: any = Changeset(this.todo);

  @action
  handleChangeTodoValue(ev: any) {
    this.changeset['todoTitle'] = ev.target.value;
  }

  @action
  async handleSubmit(ev: any) {
    ev.preventDefault();
    await this.changeset.save();

    if (!this.changeset.changes.length) {
      this.todoService.addTodo(this.todo.todoTitle);
      this.changeset.todoTitle = '';
    }
  }
}
