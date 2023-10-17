import { module, test, todo } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import TodoLocalStorageService from 'todo-list/services/todo-local-storage';
import { TodoType } from 'todo-list/types/todo';
import { TrackedArray } from 'tracked-built-ins';

module('Acceptance | todo list app', function (hooks) {
  setupApplicationTest(hooks);

  let todoLocalStorageService: TodoLocalStorageService;

  hooks.beforeEach(async function () {
    todoLocalStorageService = this.owner.lookup(
      'service:todo-local-storage'
    ) as TodoLocalStorageService;

    const todo: TodoType = {
      id: '000',
      todoTitle: 'New Todo',
    };

    await todoLocalStorageService.setTodoList(
      new TrackedArray<TodoType>([todo])
    );
  });

  hooks.afterEach(function () {
    todoLocalStorageService.clear();
  });

  test('01 - visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('[data-test-sidebar-wrapper]').exists();
    assert.dom('[data-test-sidebar-wrapper]').hasClass('bg-slate-600');

    assert.dom('[data-test-addtodo-wrapper]').exists();
    assert
      .dom('[data-test-addtodo-wrapper]')
      .hasClass('text-center')
      .hasClass('col-start-2')
      .hasClass('col-end-6');

    const cardWithTodoLink = assert.dom('[data-test-card-wrapper-link]');
    cardWithTodoLink.exists();

    await click('[data-test-card-wrapper-link]');

    assert.strictEqual(
      currentURL(),
      '/todo/000',
      'Redirect to the todo selected'
    );
  });

  test('02 - visiting /todo/0', async function (assert) {
    await visit('/todo/000');
    assert.strictEqual(currentURL(), '/todo/000');
  });
});
