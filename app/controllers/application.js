import Controller from '@ember/controller';
import Ember from 'ember';

import firebase from 'firebase';
window.firebase = firebase;

function cleanData(self) {
  self.get('model.post').deleteRecord();
  self.get('model.user').deleteRecord();
  self.send('refreshModel');
}

export default Controller.extend({
  isShowingLoginModal: false,
  isShowingRegisterModal: false,
  isShowingNewPostModal: false,
  formEmail: null,
  formPassword: null,
  firebaseApp: Ember.inject.service(),
  actions: {
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
        self.set('formEmail', '');
        self.set('formPassword', '');
        cleanData(self);
        self.set('isShowingLoginModal', false);
      }).catch(function(error) {
        var errorMessage = error.message;
        // TODO: replace alert with something nicer...
        alert(errorMessage);
      });
    },
    logoutUser() {
      cleanData(this);
      this.get('session').close();
      this.transitionToRoute('index');
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
          self.get('session').open('firebase', {
            provider: 'password',
            email: email,
            password: self.formPassword
          }).then (function() {
            cleanData(self);
            self.set('isShowingRegisterModal', false);
          });
        });
      }).catch(function(error) {
        var errorMessage = error.message; // error.code also available
        // TODO: replace alert with something nicer...
        alert(errorMessage);
      });
    },
    cancelCreateUser() {
      cleanData(self);
      this.set('isShowingRegisterModal', false);
    },
    didSelectFiles(data, resetInput) {
      const storageRef = window.firebase.storage().ref();
      let file = data;
      let fileExtension = file[0].name.replace(/^.*\./, '');
      var uploadTask = storageRef.child('images/' + this.get('model.post.id') +
        '.' + fileExtension).put(file[0]);
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
        this.set('progress', false);
        this.set('status', false);
        resetInput();
      });
    },
    createPost(uid) { // session.currentUser.uid passed in as uid
      // https://github.com/firebase/emberfire/blob/master/docs/guide/relationships.md
      // look for: "To define embedded records, we can do..."
      var self = this;
      this.store.findRecord('user', uid).then(function(user) {
        const post = self.store.createRecord('post', {
          title: self.get('model.post.title'),
          downloadURL: self.get('downloadURL'),
          dateSubmitted: new Date(),
          score: 0,
          user: user
        });

        user.get('posts').then(function(posts) {
          posts.addObject(post);
        });

        post.save().then(function() {
          return user.save().then(function() {
            cleanData(self);
            self.set('downloadURL', false);
            self.set('isShowingNewPostModal', false);
          });
        });
      });
    },
    cancelCreatePost() {
      cleanData(this);
      this.set('downloadURL', false);
      this.set('isShowingNewPostModal', false);
    }
  }
});
