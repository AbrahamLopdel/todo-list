import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Transition from '@ember/routing/transition';
import TodoService from 'todo-list/services/todo';
import setParamFilter from './helpers/set-param-filter';

export default class TodoListRoute extends Route {
  @service('todo') declare todoService: TodoService;

  beforeModel(transition: Transition<unknown>): void | Promise<unknown> {
    setParamFilter(transition, this.todoService);
  }
}
