import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-list/tests/helpers';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sidebar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component without todos', async function (assert) {
    await render(hbs`<Sidebar />`);

    assert.dom('[data-test-list-todos]').exists();
    assert.dom('[data-test-list-todos] > li').doesNotExist();
  });
});
