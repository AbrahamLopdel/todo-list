import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';
import TodoService from 'todo-list/services/todo';
import { TodoType } from 'todo-list/types/todo';

export default class TodoRoute extends Route {
  @service declare router: RouterService;

  @service('todo') declare todoService: TodoService;

  beforeModel(transition: Transition<unknown>): void | Promise<unknown> {
    const { id } = transition.to.params;

    if (!id) {
      this.router.transitionTo('index');
    }

    const todo = this.todoService.todoList.find(
      (todoItem: TodoType) => todoItem.id === id
    );

    if (!todo) {
      this.router.transitionTo('index');
    }
  }

  model(params: any) {
    const { id } = params;

    const todo = this.todoService.todoList.find(
      (todoItem: TodoType) => todoItem.id === id
    );
    console.log('todo: ', todo);

    return {
      todo,
    };
  }
}
