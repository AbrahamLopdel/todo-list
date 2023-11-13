import Service, { service } from '@ember/service';
import { action } from '@ember/object';
import { TrackedArray } from 'tracked-built-ins';
import { tracked } from '@glimmer/tracking';
import { TodoType } from 'todo-list/types/todo';
import TodoLocalStorageService from './todo-local-storage';
import RouterService from '@ember/routing/router-service';

export enum Filter {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export default class TodoService extends Service {
  @service declare router: RouterService;

  @service declare todoLocalStorage: TodoLocalStorageService;

  static TypeOfFilter = Filter;
  currentFilter: string;
  activeTodo: TodoType | null;

  #todoList: TrackedArray<TodoType>;
  @tracked filteredTodoList;
  static #lastID: number;

  constructor(properties: object) {
    super(properties);

    this.currentFilter = Filter.ALL;
    this.activeTodo = null;

    this.#todoList = this.todoLocalStorage.getTodoList();
    this.filteredTodoList = [...this.#todoList];
    TodoService.#lastID = parseInt(this.todoLocalStorage.getLastId() || '0');
  }

  @action
  addTodo(todoTitle: string) {
    const todo: TodoType = {
      id: (++TodoService.#lastID).toString(),
      todoTitle,
      todoChecked: false,
    };
    this.#todoList.push(todo);

    this.todoLocalStorage.setTodoList(this.#todoList);
    this.todoLocalStorage.setLastId(todo.id);

    if (this.currentFilter != Filter.COMPLETED) {
      this.filteredTodoList = [...this.filteredTodoList, todo];
    }
  }

  @action
  editTodo(newTodo: TodoType) {
    const lastTodo = this.#todoList.find(
      (todoInList) => todoInList.id === newTodo.id
    );

    const index = this.#todoList.indexOf(lastTodo!);

    this.#todoList[index] = newTodo;

    this.todoLocalStorage.setTodoList(this.#todoList);

    this.filterTodoList();
  }

  @action
  removeTodo(todoId: string) {
    const todo = this.#todoList.find((todo) => todo.id == todoId);
    const index = this.#todoList.indexOf(todo!);

    this.#todoList.splice(index, 1);

    this.todoLocalStorage.setTodoList(this.#todoList);

    this.filterTodoList();
  }

  get todoList(): TrackedArray<TodoType> {
    return this.#todoList;
  }

  @action
  filterTodoList(thereIsAFromPage = true) {
    switch (this.currentFilter) {
      case Filter.ACTIVE:
        this.filteredTodoList = [
          ...this.#todoList.filter((todo) => todo.todoChecked === false),
        ];
        break;
      case Filter.COMPLETED:
        this.filteredTodoList = [
          ...this.#todoList.filter((todo) => todo.todoChecked === true),
        ];
        break;
      default:
        this.filteredTodoList = [...this.#todoList];
        break;
    }

    const isInActiveList =
      this.currentFilter === Filter.ACTIVE &&
      this.activeTodo?.todoChecked === false;
    const isInCompletedList =
      this.currentFilter === Filter.COMPLETED &&
      this.activeTodo?.todoChecked === true;

    if (
      this.currentFilter &&
      this.currentFilter !== Filter.ALL &&
      !isInActiveList &&
      !isInCompletedList &&
      thereIsAFromPage
    ) {
      this.router.transitionTo('/todos');
    }
  }
}
