import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TodoService from 'todo-list/services/todo';
import { TodoType } from 'todo-list/types/todo';

enum PopUpType {
  Actions = 'actions',
  Edit = 'edit',
  Remove = 'remove',
}

interface TodoListViewTodoRowArgs {
  todo: TodoType;
}

export default class TodoListViewTodoRow extends Component<TodoListViewTodoRowArgs> {
  @service('todo') declare todoService: TodoService;
  todo = { ...this.args.todo };

  @tracked popUpActionsIsOpened = false;
  @tracked popUpEditIsOpened = false;
  @tracked popUpRemoveIsOpened = false;

  @action
  switchPopUp(popUp: PopUpType) {
    switch (popUp) {
      case 'actions':
        this.popUpActionsIsOpened = !this.popUpActionsIsOpened;
        break;
      case 'edit':
        console.log(this.popUpEditIsOpened);

        this.popUpEditIsOpened = !this.popUpEditIsOpened;
        break;
      case 'remove':
        this.popUpRemoveIsOpened = !this.popUpRemoveIsOpened;
        break;
    }
  }

  @action
  removeTodo() {
    this.todoService.removeTodo(this.args.todo.id);
  }
}
