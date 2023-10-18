import Service, { service } from '@ember/service';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';
import { TodoType } from 'todo-list/types/todo';
import TodoLocalStorageService from './todo-local-storage';

export default class TodoService extends Service {
  @service declare todoLocalStorage: TodoLocalStorageService;

  #todoList;
  static #lastID: number;

  constructor(properties: object) {
    super(properties);

    this.#todoList = this.todoLocalStorage.getTodoList();
    TodoService.#lastID = parseInt(this.todoLocalStorage.getLastId() || '0');
  }

  @action
  addTodo(todoTitle: string) {
    const todo = {
      id: (++TodoService.#lastID).toString(),
      todoTitle,
    };
    this.#todoList.push(todo);

    this.todoLocalStorage.setTodoList(this.#todoList);
    this.todoLocalStorage.setLastId(todo.id);
  }

  @action
  editTodo(newTodo: TodoType) {
    const lastTodo = this.#todoList.find(
      (todoInList) => (todoInList as TodoType).id === newTodo.id
    );
    const index = this.#todoList.indexOf(lastTodo!);

    this.#todoList[index] = newTodo;

    this.todoLocalStorage.setTodoList(this.#todoList);
  }

  @action
  removeTodo(todoId: string) {
    const todo = this.#todoList.find((todo) => todo.id == todoId);
    const index = this.#todoList.indexOf(todo!);

    this.#todoList.splice(index, 1);

    this.todoLocalStorage.setTodoList(this.#todoList);
  }

  get todoList(): TrackedArray<TodoType> {
    return new TrackedArray<TodoType>(this.#todoList);
  }
}
