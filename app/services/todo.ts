import Service from '@ember/service';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';
import { TodoType } from 'todo-list/types/todo';

export default class TodoService extends Service {
  #todoList = new TrackedArray<TodoType>();

  @action
  addTodo(todoTitle: string) {
    const todo: TodoType = {
      id: this.#todoList.length.toString(),
      todoTitle,
    };
    this.#todoList.push(todo);
  }

  @action
  editTodo(todoId: string) {
    console.log('Edit todo');
  }

  get getTodoList() {
    return this.#todoList;
  }
}
