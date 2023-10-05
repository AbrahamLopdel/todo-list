import { module, test } from 'qunit';
import { setupTest } from 'todo-list/tests/helpers';

module('Unit | Service | todo', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const todoService = this.owner.lookup('service:todo');
    assert.ok(todoService);

    todoService.addTodo('New todo');

    assert.strictEqual(todoService.getTodoList[0].todoTitle, 'New todo');
  });
});
