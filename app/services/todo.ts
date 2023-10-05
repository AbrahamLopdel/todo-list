import Service from '@ember/service';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';

export default class TodoService extends Service {
  private todoList = new TrackedArray();

  @action
  addTodo(todoTitle: unknown) {
    const todo = { todoTitle };
    this.todoList.push(todo);
  }

  get getTodoList() {
    return this.todoList;
  }
}
