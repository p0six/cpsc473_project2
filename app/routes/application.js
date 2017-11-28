import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  session: Ember.inject.service(),
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
  model() {
    return Ember.RSVP.hash({
      user: this.store.createRecord('user'),
      post: this.store.createRecord('post')
    });
  },
  actions: {
    refreshModel() { // took a while to figure this one out :D
      this.refresh();
    }
  }
});
