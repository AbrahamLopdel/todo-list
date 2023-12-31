import { service } from '@ember/service';
import Component from '@glimmer/component';
import { TodoType } from 'todo-list/types/todo';

interface TodoListViewArgs {
  todo: TodoType;
}

export default class TodoListViewComponent extends Component<TodoListViewArgs> {
  @service('todo') declare todoService: TodoType;
}
