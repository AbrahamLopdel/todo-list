import Service from '@ember/service';
import { TodoType } from 'todo-list/types/todo';
import { TrackedArray } from 'tracked-built-ins';

export default class TodoLocalStorageService extends Service {
  getTodoList() {
    return new TrackedArray<TodoType>(
      JSON.parse(localStorage.getItem('TODOS') || '[]')
    );
  }

  getLastId() {
    return localStorage.getItem('LAST_ID.TODOS');
  }

  setTodoList(todoList: TrackedArray<TodoType>) {
    localStorage.setItem('TODOS', JSON.stringify(todoList));
  }

  setLastId(value: string) {
    localStorage.setItem('LAST_ID.TODOS', value);
  }

  clear() {
    localStorage.clear();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'todo-local-storage-service': TodoLocalStorageService;
  }
}
