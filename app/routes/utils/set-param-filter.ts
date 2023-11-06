import Transition from '@ember/routing/transition';
import TodoService, { Filter } from 'todo-list/services/todo';

export default (transition: Transition<unknown>, todoService: TodoService) => {
  let kindOfFilter;
  const thereIsAFromPage = !!transition.from;

  if (thereIsAFromPage) {
    kindOfFilter = transition.from.queryParams['kindOfFilter'];
  } else {
    kindOfFilter = transition.to.queryParams['kindOfFilter'];
  }

  if (kindOfFilter !== todoService.currentFilter) {
    if (!kindOfFilter) {
      kindOfFilter = todoService.currentFilter;

      transition.to.queryParams['kindOfFilter'] = todoService.currentFilter;
    }

    if (kindOfFilter !== Filter.ALL) {
      todoService.currentFilter = kindOfFilter;
      todoService.filterTodoList(thereIsAFromPage);
    }
  }
};
