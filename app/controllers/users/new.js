import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  firebaseApp: Ember.inject.service(),
  actions: {
    create(email, pass) {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
      const auth = this.get('firebaseApp').auth();
      auth.createUserWithEmailAndPassword(email, pass).then((userResponse) => {
        const user = this.store.createRecord('user', {
          id: userResponse.uid,
          email: userResponse.email, // must be unique
          username: this.get('model.user.username'),
          firstName: this.get('model.user.firstName'),
          lastName: this.get('model.user.lastName'),
          bio: this.get('model.user.bio'),
          memberSince: new Date(),
          post_score: 0,
          comment_score: 0
        });
        var self = this;
        return user.save().then(function() {
          // TODO: look into saving the session without having to make a second call to authenticate
          self.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: pass
          });
          self.transitionToRoute('users');
        });
      }).catch(function(error) {
        //var errorCode = error.code; //
        var errorMessage = error.message;
        alert(errorMessage);
      });
    },
    cancel() {
      this.get('model.user').deleteRecord();
      this.transitionToRoute('users');
    }
  }
});
