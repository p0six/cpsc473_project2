import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    create() {
      var newUser = this.store.createRecord('user', {
        username: this.get('model.user.username'), // we use model.user since we're using an RSVPHash
        pw_hash: this.get('model.user.username'), // this will need to change, obviously.
        email: this.get('model.user.email'),
        firstName: this.get('model.user.firstName'),
        lastName: this.get('model.user.lastName'),
        bio: this.get('model.user.bio'),
        memberSince: new Date(),
        post_score: 0,
        comment_score: 0,
        posts: [], // does not end up in data..
        favorite_posts: [],
        disliked_posts: [],
        favorite_comments: [],
        disliked_comments: [],
        comments: []
      });
      var self = this;
      newUser.save().then(function() {
        self.transitionToRoute('users');
      });
    },
    cancel() {
      this.get('model.user').deleteRecord();
      this.transitionToRoute('users');
    }
  }
});
