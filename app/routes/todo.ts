import Route from '@ember/routing/route';
import { service } from '@ember/service';
import TodoService from 'todo-list/services/todo';
import { TodoType } from 'todo-list/types/todo';

interface ParamsType {
  id?: string;
}

export default class TodoRoute extends Route {
  @service('todo') declare todoService: TodoService;
  model(params: ParamsType) {
    console.log(params);
    const todo = this.todoService.getTodoList.find(
      (todoItem: TodoType) => todoItem.id === params.id
    );
    console.log(todo);
    return {
      todo,
    };
  }
}
