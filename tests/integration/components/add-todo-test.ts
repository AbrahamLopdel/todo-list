import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import TodoService from 'todo-list/services/todo';
import TodoLocalStorageService from 'todo-list/services/todo-local-storage';

module('Integration | Component | add-todo', function (hooks) {
  setupRenderingTest(hooks);

  test('01 - it renders the content of the component properly', async function (assert) {
    await render(hbs`<AddTodo />`);

    assert.dom('[data-test-page-title]').exists('Title exists');
    assert.dom('[data-test-page-title]').hasText('Todos');
    assert.dom('[data-test-page-title]').hasClass('font-extralight');
    const input = assert.dom('[data-test-add-input]');
    input.exists();
    input.hasAttribute('placeholder', 'New todo?');
  });

  test('02 - it adds a new todo in the todo list', async function (assert) {
    const todoService = this.owner.lookup('service:todo') as TodoService;
    const todoLocalStorageService = this.owner.lookup(
      'service:todo-local-storage'
    ) as TodoLocalStorageService;
    todoLocalStorageService.clear();

    await render(hbs`<AddTodo />`);

    assert.dom('[data-test-add-button]').exists('Add button exists');

    assert.strictEqual(
      todoLocalStorageService.getTodoList().length,
      0,
      'There is no todos in todoList'
    );

    await fillIn('[data-test-add-input]', 'New todo');
    await click('[data-test-add-button]');

    const [todo] = todoService.todoList;

    assert.strictEqual(
      todo?.todoTitle,
      'New todo',
      'There is a todo with title: "New Todo"'
    );
  });
});
