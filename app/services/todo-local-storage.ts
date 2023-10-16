import Service, { service } from '@ember/service';
import TodoService from './todo';

export default class TodoLocalStorageService extends Service {
  @service('todo') declare todoService: TodoService;

  getTodoList() {
    return localStorage.getItem('TODOS');
  }

  getLastId() {
    return localStorage.getItem('LAST_ID.TODOS');
  }

  setTodoList() {
    localStorage.setItem('TODOS', JSON.stringify(this.todoService.todoList));
  }

  setLastId(value: string) {
    localStorage.setItem('LAST_ID.TODOS', value);
  }

  clear() {
    localStorage.clear();
  }
}
