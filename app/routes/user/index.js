import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('post', {
      user: this.get('session.currentUser.uid')/*,
      limitToLast: 15 */
    });
  }
});
