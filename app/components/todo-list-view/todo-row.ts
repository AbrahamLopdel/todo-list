import Component from '@glimmer/component';
import { TodoType } from 'todo-list/types/todo';

interface TodoListViewTodoRowArgs {
  todo: TodoType;
}

export default class TodoListViewTodoRow extends Component<TodoListViewTodoRowArgs> {}
