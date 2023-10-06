import Route from '@ember/routing/route';

export default class TodoRoute extends Route {
  model(params: any) {
    console.log('params: ', params);
    const { id } = params;

    return {
      id,
    };
  }
}
