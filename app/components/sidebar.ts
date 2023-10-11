import { service } from '@ember/service';
import TodoService from 'todo-list/services/todo';
import Component from '@glimmer/component';

export default class SidebarComponent extends Component {
  @service('todo') declare todoService: TodoService;
}
