import Service from '@ember/service';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';

export default class TodoService extends Service {
  private todoList = new TrackedArray();

  @action
  addTodo(todoTitle: string) {
    const todo = {
      id: this.todoList.length,
      todoTitle,
    };
    this.todoList.push(todo);
  }

  @action
  editTodo(todoId: string) {
    console.log('Edit todo');
  }

  get getTodoList() {
    return this.todoList;
  }
}
