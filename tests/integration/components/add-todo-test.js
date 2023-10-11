import { module, test } from 'qunit';
// import { setupTest } from 'ember-qunit';
import { setupRenderingTest } from 'todo-list/tests/helpers';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-todo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content of the component properly', async function (assert) {
    await render(hbs`<AddTodo />`);

    assert.dom('[data-test-page-title]').exists();
    assert.dom('[data-test-page-title]').hasText('Todos');
    assert.dom('[data-test-page-title]').hasClass('font-extralight');
    const input = assert.dom('[data-test-add-input]');
    input.exists();
    input.hasAttribute('placeholder', 'New todo?');
  });

  test('it adds a new todo in the todo list', async function (assert) {
    const todoService = this.owner.lookup('service:todo');

    await render(hbs`<AddTodo />`);

    assert.dom('[data-test-add-button]').exists();

    assert.strictEqual(todoService.todoList.length, 0);

    await fillIn('[data-test-add-input]', 'New todo');
    await click('[data-test-add-button]');

    assert.strictEqual(todoService.todoList[0].todoTitle, 'New todo');
  });
});
