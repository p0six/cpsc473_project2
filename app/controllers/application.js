import Controller from '@ember/controller';
import Ember from 'ember';

import firebase from 'firebase';
import Swal from 'sweetalert2'

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
    loginUser() {  // https://firebase.google.com/docs/auth/admin/manage-cookiesh
      // const auth = this.get('firebaseApp').auth();
      let pass = this.get('formPassword');
      let email = this.get('formEmail');
      let myself = this;
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function (result) {
          // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
          myself.set('formEmail', '');
          myself.set('formPassword', '');
          //cleanData(myself);
          myself.set('isShowingLoginModal', false);
          Swal.fire({
            'title': 'Login Success!',
            'icon': 'success'
          });
        }).catch(function (error) {
        // Handle error.
        Swal.fire({
          'title': 'Login Failure!',
          'icon': 'error',
          'text': error.message
        });
      });
    },
    // aloginUser() {
    //   var self = this;
    //   this.get('session').open('firebase', {
    //     provider: 'password',
    //     email: self.formEmail,
    //     password: self.formPassword
    //   }).then(function() {
    //     self.set('formEmail', '');
    //     self.set('formPassword', '');
    //     cleanData(self);
    //     self.set('isShowingLoginModal', false);
    //     Swal.fire({
    //       'title': 'Login Success!',
    //       'icon': 'success'
    //     });
    //   }).catch(function(error) {
    //     Swal.fire({
    //       'title': 'Login Failure!',
    //       'icon': 'error',
    //       'text': error.message
    //     });
    //   });
    // },
    logoutUser() {
      this.get('session').close();
      Swal.fire({
        'title': 'Successfully Logged Out!',
        'icon': 'success'
      });
      this.transitionToRoute('index');
    },
    createUser(email) {
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
      // const auth = this.get('firebaseApp').auth();
      let pass = this.get('formPassword');
      firebase.auth().createUserWithEmailAndPassword(email, pass).then((userResponse) => {
        var self = this;
        const user = this.store.createRecord('user', {
          id: userResponse.uid,
          email: userResponse.email, // must be unique
          displayName: this.get('model.user.displayName'),
          firstName: this.get('model.user.firstName'),
          lastName: this.get('model.user.lastName'),
          bio: this.get('model.user.bio'),
          memberSince: new Date(),
          post_score: 0,
          comment_score: 0
        });
        return user.save().then(function () {
          // TODO: authenticating session without a 2nd call to firebase
          firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (result) {
              // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
              //cleanData(self);
              Swal.fire({
                'title': 'Registration Success!',
                'icon': 'success',
                'text': 'Welcome to ImgRepo!'
              });
              self.set('isShowingRegisterModal', false);
            });
        });
        // self.get('session').open('firebase', {
        //   provider: 'password',
        //   email: email,
        //   password: self.formPassword
        // }).then(function() {
        //   cleanData(self);
        //   Swal.fire({
        //     'title': 'Registration Success!',
        //     'icon': 'success',
        //     'text': 'Welcome to ImgRepo!'
        //   });
        //   self.set('isShowingRegisterModal', false);
        // });
        //});
      }).catch(function (error) {
        // could maybe do a switch on error.code since firebase will spit out
        // descriptive errors that allow a user to potentially brute force site
        // for valid logins...
        var errorMessage = error.message; // error.code also available
        Swal.fire({
          'title': 'Registration Failure!',
          'icon': 'error',
          'text': errorMessage
        });
      });
    },
    cancelCreateUser() {
      //cleanData(this);
      this.set('isShowingRegisterModal', false);
    },
    didSelectFiles(data, resetInput) {
      const storageRef = window.firebase.storage().ref();
      let file = data;
      let fileExtension = file[0].name.replace(/^.*\./, '');
      this.set('uploadRef', 'images/' + this.get('model.post.id') + '.' + fileExtension);
      var uploadTask = storageRef.child(this.get('uploadRef')).put(file[0]);

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
        Swal.fire({
          'title': 'Upload Failure!',
          'icon': 'error',
          'text': error.message
        });
      }, () => {
        this.set('downloadURL', uploadTask.snapshot.downloadURL);
        this.set('progress', false);
        this.set('status', false);
        resetInput();
      });
    },
    createPost(uid) { // session.currentUser.uid passed in as uid
      var self = this;
      this.store.findRecord('user', uid).then(function (user) {
        const post = self.store.createRecord('post', {
          title: self.get('model.post.title'),
          downloadURL: self.get('downloadURL'),
          dateSubmitted: new Date(),
          score: 0,
          user: user
        });

        user.get('posts').then(function (posts) {
          posts.addObject(post);
        });

        post.save().then(function (myPost) {
          return user.save().then(function () {
            //cleanData(self);
            self.set('downloadURL', false);
            self.set('uploadRef', false);
            self.set('isShowingNewPostModal', false);
            Swal.fire({
              'title': 'Posted!',
              'icon': 'success',
              'text': 'PostID: ' + myPost.id
            });
          });
        });
      });
    },
    cancelCreatePost() {
      // We now delete the uploaded file if the user cancels out of the post...
      var self = this;
      var uploadRef = this.get('uploadRef');
      if (uploadRef) {
        window.firebase.storage().ref().child(uploadRef).delete().then(function () {
          self.set('uploadRef', false);
        }).catch(error => {
          Swal.fire({
            'title': 'Error deleting temp image!',
            'icon': 'error',
            'text': error.message
          });
        });
      }
      //cleanData(this);
      this.set('downloadURL', false);
      this.set('isShowingNewPostModal', false);
    }
  }
});
