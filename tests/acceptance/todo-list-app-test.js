import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'todo-list/tests/helpers';

module('Acceptance | todo list app', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
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
  });
});
