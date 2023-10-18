import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | sidebar/todo-card', function (hooks) {
  setupRenderingTest(hooks);

  test('01 - it renders the component correctly', async function (assert) {
    this.setProperties({
      todo: {
        id: '3000',
        todoTitle: 'New Todo',
      },
    });

    await render(hbs`<Sidebar::TodoCard @todo={{this.todo}} />`);

    assert
      .dom('[data-test-card-wrapper-link] h2')
      .exists()
      .hasText('New Todo', 'Card must have a title');

    assert
      .dom('[data-test-delete-icon]')
      .exists()
      .hasAttribute('src', '/delete-24.svg', 'Icon has the apropriate image');

    assert.dom('[data-test-card-wrapper-link] hr').exists();
  });

  test(`02 - GIVEN the todo card component
  WHEN button with delete icon is clicked
  THEN it deletes the current todo`, async function (assert) {
    this.setProperties({
      todo: {
        id: '3000',
        todoTitle: 'New Todo',
      },
    });

    await render(hbs`<Sidebar::TodoCard @todo={{this.todo}} />`);

    assert.dom('[data-test-delete-button]').exists('Delete button exists');

    await click('[data-test-delete-button]');
    assert.dom('[data-test-card-wrapper-link] > div').doesNotExist();
  });
});
