import Controller from '@ember/controller';
import Ember from 'ember';

import firebase from 'firebase';
window.firebase = firebase;
import sweetAlert from 'ember-sweetalert';

export default Controller.extend({
  actions: {
    updateUser() {
        var self = this;
        this.store.findRecord('user', this.get('session.currentUser.uid')).then(function(u) {
        u.set('displayName', self.get('model.displayName'));
        u.set('firstName', self.get('model.firstName'));
        u.set('bio', self.get('model.bio'));
        u.set('lastName', self.get('model.lastName'));
        // u.set('username', "Bhaviya04");
        // u.set('firstName', "Bhaviya");
        // u.set('bio', "I am always best");
        // u.set('lastName', "Gandani");
        u.save();
      });
      sweetAlert({'title': 'Profile Updated Successfully!', 'type': 'success'});
      this.transitionToRoute('index');
    },
    cancelUpdateUser() {
        this.transitionToRoute('index');
    }
  }
});
