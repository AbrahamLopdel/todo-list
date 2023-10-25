import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import Transition from '@ember/routing/transition';
import { service } from '@ember/service';

export default class TodoListRoute extends Route {
  @service declare router: RouterService;

  beforeModel(transition: Transition<unknown>): void | Promise<unknown> {
    this.router.transitionTo('/todos');
  }
}
