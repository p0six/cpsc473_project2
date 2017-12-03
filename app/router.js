import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('user', function() {
    this.route('edit');
  });
  this.route('post',  {path: ':post_id'},
  function() {
    this.route('edit');
  });
  this.route('posts', function() {
    this.route('new');
  });
  this.route('users', function() {
    this.route('new');
  });
  this.route('comments', function() {
    this.route('new');
  });
  this.route('comment', function() {
    this.route('edit');
  });
});

export default Router;
