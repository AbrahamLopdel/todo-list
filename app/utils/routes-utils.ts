import Transition from '@ember/routing/transition';
import TodoService, { Filter } from 'todo-list/services/todo';

export const setParamFilter = (
  transition: Transition<unknown>,
  todoService: TodoService
) => {
  let kindOfFilter;
  const thereIsAFromPage = !!transition.from;

  if (thereIsAFromPage) {
    kindOfFilter = todoService.currentFilter;
  } else {
    kindOfFilter = transition.to.queryParams['kindOfFilter'];
  }

  if (kindOfFilter !== Filter.ALL) {
    todoService.currentFilter = kindOfFilter!;
    todoService.filterTodoList(thereIsAFromPage);
  }
};
