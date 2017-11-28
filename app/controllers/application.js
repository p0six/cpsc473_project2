import Controller from '@ember/controller';
import Ember from 'ember';

// firebase import thanks to: https://github.com/firebase/emberfire/issues/490
import firebase from 'firebase';
window.firebase = firebase;

export default Controller.extend({
  isShowingModal: false,
  isShowingLoginModal: false,
  isShowingRegisterModal: false,
  isShowingNewPostModal: false,
  formEmail: null,
  formPassword: null,
  firebaseApp: Ember.inject.service(),
  actions: {
    showModalDialog(message) {
      this.set('modalMessage', message);
      this.set('isShowingModal', true);
    },
    closeModalDialog() {
      this.set('isShowingModal', false);
    },
    showLoginModal(message) {
      this.set('modalMessage', message);
      this.set('isShowingLoginModal', true);
    },
    closeLoginModal() {
      this.set('isShowingLoginModal', false);
    },
    showRegisterModal(message) {
      this.set('modalMessage', message);
      this.set('isShowingRegisterModal', true);
    },
    closeRegisterModal() {
      this.set('isShowingRegisterModal', false);
    },
    showNewPostModal(message) {
      this.set('modalMessage', message);
      this.set('isShowingNewPostModal', true);
    },
    closeNewPostModal() {
      this.set('isShowingNewPostModal', false);
    },
    loginUser() {
      var self = this;
      this.get('session').open('firebase', {
        provider: 'password',
        email: self.formEmail,
        password: self.formPassword
      }).then(function() {
        self.set('isShowingLoginModal', false);
        var dirtyUser = self.get('model.user');
        if (dirtyUser.get('hasDirtyAttributes')) {
          dirtyUser.deleteRecord();
        }
      }).catch(function(error) {
        var errorMessage = error.message;
        // TODO: replace alert with something nicer...
        alert(errorMessage);
      });
    },
    logoutUser() {
      this.get('session').close();
      this.send('refreshModel'); // took a while to figure this one out :D
    },
    createUser(email) {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
      const auth = this.get('firebaseApp').auth();
      let pass = this.get('formPassword');
      auth.createUserWithEmailAndPassword(email,pass).then((userResponse) => {
        var self = this;
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
        return user.save().then(function() {
          // TODO: autheticating session without a 2nd call to firebase
          var dirtyUser = self.get('model.user');
          if (dirtyUser.get('hasDirtyAttributes')) {
            dirtyUser.deleteRecord();
          }
          self.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: self.formPassword
          });
          self.set('isShowingRegisterModal', false);
        });
      }).catch(function(error) {
        var errorMessage = error.message; // error.code also available
        // TODO: replace alert with something nicer...
        alert(errorMessage);
      });
    },
    cancelCreateUser() {
      this.set('isShowingRegisterModal', false);
    },
    didSelectFiles(data) {
      const storageRef = window.firebase.storage().ref();
      let file = data;
      var uploadTask = storageRef.child('images/' + file[0].name).put(file[0]);
      uploadTask.on(window.firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.set('progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
        this.set('progress', progress);
        switch (snapshot.state) {
          case window.firebase.storage.TaskState.PAUSED:
            this.set('status', 'Upload is paused');
            break;
          case window.firebase.storage.TaskState.RUNNING:
            this.set('status', 'Upload is running');
            break;
        }
      }, (error) => {
        alert(error.message);
      }, () => {
        this.set('downloadURL', uploadTask.snapshot.downloadURL);
      });
    }
  }
});
