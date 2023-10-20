import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Changeset } from 'ember-changeset';
import TodoService from 'todo-list/services/todo';
import { TodoType } from 'todo-list/types/todo';

interface SidebarTodoCardArgs {
  todo: TodoType;
}

export default class SidebarTodoCardComponent extends Component<SidebarTodoCardArgs> {
  @service declare router: RouterService;
  @service('todo') declare todoService: TodoService;

  changeset = Changeset(this.args.todo);

  @action
  handleChangeDone(ev: any) {
    ev.stopPropagation();

    this.changeset.set('todoChecked', ev.target.checked);
    this.changeset.save();

    this.todoService.editTodo(this.changeset.data as TodoType);
  }

  @action
  removeTodo(ev: Event) {
    ev.preventDefault();
    this.todoService.removeTodo(this.args.todo.id);

    const { id: currentRouterId } = this.router.currentRoute?.params || '';

    const todo = this.todoService.todoList.find(
      (todoItem: TodoType) => todoItem.id === currentRouterId
    );

    if (!todo) {
      this.router.transitionTo('index');
    }
  }
}
