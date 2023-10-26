import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Changeset } from 'ember-changeset';
import { TodoType } from 'todo-list/types/todo';

interface TodoListViewTodoRowArgs {
  todo: TodoType;
}

export default class TodoListViewTodoRow extends Component<TodoListViewTodoRowArgs> {
  changeset = Changeset({ ...this.args.todo });

  @tracked popUpActionsIsOpened = false;
  @tracked popUpEditIsOpened = false;

  @action
  switchPopUpActions() {
    this.popUpActionsIsOpened = !this.popUpActionsIsOpened;
  }

  @action
  switchPopUpEdit() {
    this.popUpEditIsOpened = !this.popUpEditIsOpened;
  }
}
