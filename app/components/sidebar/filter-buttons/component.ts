import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import TodoService, { Filter } from 'todo-list/services/todo';

interface SidebarFilterButtonsArgs {}

export default class SidebarFilterButtons extends Component<SidebarFilterButtonsArgs> {
  @service declare router: RouterService;
  @service('todo') declare todoService: TodoService;

  typeOfFilter: typeof Filter = TodoService.TypeOfFilter;

  constructor(owner: unknown, args: SidebarFilterButtonsArgs) {
    super(owner, args);
  }

  @action
  filterBy(filter: typeof Filter) {
    this.todoService.currentFilter = filter.toString();
    this.todoService.filterTodoList();
  }
}
