import Transition from '@ember/routing/transition';
import TodoService, { Filter } from 'todo-list/services/todo';

export default (transition: Transition<unknown>, todoService: TodoService) => {
  let kindOfFilter = transition.from?.queryParams['kindOfFilter'];

  if (kindOfFilter !== todoService.currentFilter) {
    if (!kindOfFilter) {
      kindOfFilter = todoService.currentFilter;

      transition.to.queryParams['kindOfFilter'] = todoService.currentFilter;
      // this.router.transitionTo(`/todo/${id}`, {
      //   queryParams: { kindOfFilter },
      // });
    }

    if (kindOfFilter !== Filter.ALL) {
      todoService.currentFilter = kindOfFilter;
      todoService.filterTodoList();
    }
  }
};
