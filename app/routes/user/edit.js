import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    //  return this.store.findRecord('user','HXxFENg8vxUqEj4N27wAmJQySfl2');
    return this.store.findRecord('user', this.get('session.currentUser.uid'));
  }
});
