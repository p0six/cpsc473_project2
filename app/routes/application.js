import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  session: Ember.inject.service(),
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: { // TODO: clean this up....kk
    signIn(provider) { // can feed in email / pass right here..
      this.get('session').open('firebase', {
        provider: provider,
        email: 'romerom@gmail.com',
        // if we can feed it in via a modal here... we can do the same with register.
        // https://www.npmjs.com/package/ember-modal - shows a form modal...
        password: 'password'
      });//.then(function(data) {
        //console.log(data.currentUser);
      //});
    },
    signOut() {
      this.get('session').close();
    }
    // could have used this.controllerFor('application').set('modalMessage', true)
    // probably better to keep it in a controller tho? :D
  }
});
