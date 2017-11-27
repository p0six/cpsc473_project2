import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  /*model() {
    return this.store.findAll('user');
  }*/
  model() {
    return Ember.RSVP.hash({ // this is a special type of property.. need to handle hash..
      user: this.store.createRecord('user')
    });
  },
  actions: {
    willTransition() {
      var user = this.get('controller.model.user');
      if(user.get('hasDirtyAttributes')) {
        user.deleteRecord();
      }
    }
  }
});
