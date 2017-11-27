import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  session: Ember.inject.service(),
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
  model() {
    // TODO: think about the following:
    // when building a single page application, how do we have a valid 'model'
    // capable of displaying all the data we're looking for??
    return Ember.RSVP.hash({
      user: this.store.createRecord('user')
    });
  },
  actions: {
    refreshModel() { // took a while to figure this one out :D
      this.refresh();
    }
  }
});
