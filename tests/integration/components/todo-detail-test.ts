import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { Changeset } from 'ember-changeset';
import { TodoType } from 'todo-list/types/todo';
import moment from 'moment';

module('Integration | Component | todo-detail', function (hooks) {
  setupRenderingTest(hooks);

  test('01 - it renders the title with their aproppriate attributes and classes', async function (assert) {
    const todo: TodoType = {
      id: '2000',
      todoTitle: 'New Todo',
      todoChecked: false,
    };

    this.setProperties({
      todoChangeset: Changeset(todo),
    });

    await render(hbs`<TodoDetail @todoChangeset={{this.todoChangeset}}/>`);

    assert.dom('[data-test-input-title]').exists('Input title exists');
    assert
      .dom('[data-test-input-title]')
      .hasAttribute('placeholder', 'Change the title')
      .hasClass('text-center')
      .hasClass('text-5xl')
      .hasClass('font-extralight');
  });

  test('02 - it renders the appropriate icon', async function (assert) {
    const todo: TodoType = {
      id: '2000',
      todoTitle: 'New Todo',
      todoChecked: false,
    };

    this.setProperties({
      todoChangeset: Changeset(todo),
    });

    await render(hbs`<TodoDetail @todoChangeset={{this.todoChangeset}}/>`);

    assert.dom('[data-test-edit-icon]').exists();
    assert
      .dom('[data-test-edit-icon]')
      .hasAttribute('src', '/edit-18.svg', 'This is the appropriate icon');
  });

  test(`03 - GIVEN the todo detail component
  WHEN the due date is less than 7 and greater than 3
  THEN just the first two notification checkbox will be enabled`, async function (assert) {
    const date = moment(moment(), 'DD-MM-YYYY').add(5, 'days').toDate();

    const todo: TodoType = {
      id: '2000',
      todoTitle: 'New Todo',
      todoDueDate: date,
      todoChecked: false,
    };

    this.setProperties({
      todoChangeset: Changeset(todo),
    });

    await render(hbs`<TodoDetail @todoChangeset={{this.todoChangeset}}/>`);

    assert.dom('[data-test-input-date]').exists('Input date exists');

    const notifOneDayLabel = assert.dom('[data-test-label-notif-one-day]');

    const notifThreeDaysLabel = assert.dom(
      '[data-test-label-notif-three-days]'
    );

    const notifOneWeekLabel = assert.dom('[data-test-label-notif-week]');

    const notifOneMonthLabel = assert.dom('[data-test-label-notif-month]');

    notifOneDayLabel.exists('Label notification "One Day" exists');

    notifThreeDaysLabel.exists('Label notification "Three Days" exists');

    notifOneWeekLabel.doesNotExist(
      'Label notification "One Week" does not exist'
    );
    notifOneMonthLabel.doesNotExist(
      'Label notification "One Month" does not exist'
    );
  });

  test('04 - it renders the form properly', async function (assert) {
    const date = moment(moment(), 'DD-MM-YYYY').add(45, 'days').toDate();

    const todo: TodoType = {
      id: '2000',
      todoTitle: 'New Todo',
      todoDescription: 'Call before tomorrow',
      todoDueDate: date,
      todoNotification: {
        threeDays: true,
      },
      todoChecked: false,
    };

    this.setProperties({
      todoChangeset: Changeset(todo),
    });

    await render(hbs`<TodoDetail @todoChangeset={{this.todoChangeset}}/>`);

    assert.dom('[data-test-input-title]').exists('Input title exists');
    assert
      .dom('[data-test-input-description]')
      .exists('Input description exists');
    assert.dom('[data-test-input-date]').exists('Input date exists');

    const notifOneDayLabel = assert.dom('[data-test-label-notif-one-day]');
    const notifOneDayInput = assert.dom(
      '[data-test-label-notif-one-day] > input'
    );

    const notifThreeDaysLabel = assert.dom(
      '[data-test-label-notif-three-days]'
    );
    const notifThreeDaysInput = assert.dom(
      '[data-test-label-notif-three-days] > input'
    );

    const notifOneWeekLabel = assert.dom('[data-test-label-notif-week]');

    const notifOneMonthLabel = assert.dom('[data-test-label-notif-month]');

    notifOneDayLabel.exists('Label notification "One Day" exists');
    notifOneDayInput.isNotChecked('Notification one day before is not checked');

    notifThreeDaysLabel.exists('Label notification "Three Days" exists');
    notifThreeDaysInput.isChecked('Notification three days before is checked');

    notifOneWeekLabel
      .exists('Label notification "One Week" exists')
      .hasText('One week before');
    notifOneMonthLabel
      .exists('Label notification "One Month" exists')
      .hasText('One month before');
  });
});
