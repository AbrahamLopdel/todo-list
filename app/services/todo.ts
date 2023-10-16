import Service from '@ember/service';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';
import { TodoType } from 'todo-list/types/todo';

export default class TodoService extends Service {
  #todoList;
  static #lastID: number;

  constructor(properties: object) {
    super(properties);

    this.#todoList = new TrackedArray<TodoType>(
      JSON.parse(localStorage.getItem('TODOS') || '[]')
    );
    TodoService.#lastID = parseInt(
      localStorage.getItem('LAST_ID.TODOS') || '0'
    );
  }

  @action
  addTodo(todoTitle: string) {
    const todo = {
      id: (++TodoService.#lastID).toString(),
      todoTitle,
    };
    this.#todoList.push(todo);

    localStorage.setItem('TODOS', JSON.stringify(this.#todoList));
    localStorage.setItem('LAST_ID.TODOS', todo.id);
  }

  @action
  editTodo(newTodo: TodoType) {
    const lastTodo = this.#todoList.find(
      (todoInList) => (todoInList as TodoType).id === newTodo.id
    );
    const index = this.#todoList.indexOf(lastTodo!);

    this.#todoList[index] = newTodo;

    localStorage.setItem('TODOS', JSON.stringify(this.#todoList));
  }

  @action
  removeTodo(todoId: string) {
    const todo = this.#todoList.find((todo) => (todo as TodoType).id == todoId);
    const index = this.#todoList.indexOf(todo!);

    this.#todoList.splice(index, 1);

    localStorage.setItem('TODOS', JSON.stringify(this.#todoList));
  }

  get todoList(): TrackedArray<TodoType> {
    return new TrackedArray<TodoType>(this.#todoList);
  }
}
