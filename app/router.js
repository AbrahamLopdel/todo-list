import EmberRouter from '@ember/routing/router';
import config from 'todo-list/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('todo-list', { path: '/todos' });
  this.route('todo', { path: '/todo/:id' });
  this.route('redirect', { path: '/*path' });
  // this.route('redirect', { path: '/' });
});
