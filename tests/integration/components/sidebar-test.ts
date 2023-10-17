import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import TodoLocalStorageService from 'todo-list/services/todo-local-storage';
import { TrackedArray } from 'tracked-built-ins';
import { TodoType } from 'todo-list/types/todo';

module('Integration | Component | sidebar', function (hooks) {
  setupRenderingTest(hooks);

  let todoLocalStorageService: TodoLocalStorageService;

  hooks.beforeEach(function () {
    todoLocalStorageService = this.owner.lookup(
      'service:todo-local-storage'
    ) as TodoLocalStorageService;
    todoLocalStorageService.clear();
  });

  test('01 - it renders the component without todos', async function (assert) {
    await render(hbs`<Sidebar />`);

    assert.dom('[data-test-list-todos]').exists();
    assert.dom('[data-test-list-todos] > li').doesNotExist();
  });

  test('02 - it renders the component with todos', async function (assert) {
    const todo: TodoType = {
      id: '1000',
      todoTitle: 'New Todo',
    };

    await todoLocalStorageService.setTodoList(
      new TrackedArray<TodoType>([todo])
    );

    await render(hbs`<Sidebar />`);

    assert.dom('[data-test-list-todos]').exists();
    assert.dom('[data-test-list-todos] > li').exists();

    todoLocalStorageService.clear();
  });
});
