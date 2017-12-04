import Controller from '@ember/controller';
import sweetAlert from 'ember-sweetalert';

export default Controller.extend({
  queryParams: ['myIndex', 'posts'],
  myIndex: 0,
  posts: [],
  prevIndex: function() {
    return this.get('myIndex') - 1;
  }.property('myIndex'),
  nextIndex: function() {
    return this.get('myIndex') + 1;
  }.property('myIndex'),
  showPrevious: function() {
    if (this.get('prevIndex') > -1) {
      return true;
      //console.log(this.get('posts').objectAt(this.get('prevIndex')));
    } else {
      return false;
    }
  }.property('prevIndex'),
  showNext: function() {
    if (this.get('nextIndex') < this.get('posts').get('length')) {
      return true;
      //console.log(this.get('posts').objectAt(this.get('prevIndex')));
    } else {
      return false;
    }
  }.property('nextIndex', 'posts'),
  prevPost: function() {
    if (this.get('showPrevious')) {
      return this.get('posts').objectAt(this.get('prevIndex'));
    } else {
      return null;
    }
  }.property('showPrevious', 'posts', 'prevIndex'),
  nextPost: function() {
    if (this.get('showNext')) {
      return this.get('posts').objectAt(this.get('nextIndex'));
    } else {
      return null;
    }
  }.property('showNext', 'posts', 'nextIndex'),
  actions: {
    test() {
      /*
            console.log(this.get('posts'));
            console.log(this.get('posts').objectAt(this.get('prevIndex')));
            console.log(this.get('posts').objectAt(this.get('myIndex')));
            console.log(this.get('posts').objectAt(this.get('nextIndex')));*/
    },
    //postCommentMike(pid, uid, email) { //  this method requires a modified comment model
    postComment(pid, uid) { // this method
      var self = this;
      self.store.findRecord('user', uid).then(function(user) {
        self.store.findRecord('post', pid).then(function(post) {
          const comment = self.store.createRecord('comment', {
            user: user,
            post: post,
            comment: self.get('model.comment.comment'),
            dateSubmitted: new Date(),
            score: 1
          });

          user.get('comments').then(function(comments) {
            comments.addObject(comment);
          });

          post.get('comments').then(function(comments) {
            comments.addObject(comment);
          });

          comment.save().then(function(myComment) {
            post.save().then(function() {
              return user.save().then(function() {
                // TODO: need to refresh the comment model to get a new comment object...
                sweetAlert({
                  'title': 'Comment Posted!',
                  'type': 'success',
                  'text': 'CommentID: ' + myComment.id
                })
              });
            });
          });
        });
      });
    }
  }
});
