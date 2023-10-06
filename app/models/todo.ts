import Model, { attr } from '@ember-data/model';

export default class TodoModel extends Model {
  @attr id: string = '';
  @attr todoTitle: string = '';
  @attr todoDescription: string = '';
}
