import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // this really should return values in reverse... right now it doesn't.
    return this.store.findAll('post');
  }
});
