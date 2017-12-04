import Controller from '@ember/controller';
import Ember from 'ember';
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
  }.property('showNext','posts','nextIndex'),
  getVoteInfo:  function(model, itemTag) {
    var idTag = 'email';
    var user = model.get('user').content;
    var userId = user.get(idTag);
    var list = model.get(itemTag);
    var hasVotedResult = false;

    list.forEach(function(i){
      var itemId = i.get(idTag);
      if (itemId == userId) {
        hasVotedResult = true;
        return;
      }
    });

    return {'user': user, 'userId': userId, 'list': list, 'hasVoted': hasVotedResult};
  },
  doVote : function(model, itemTag) {
    var info = this.getVoteInfo(model, itemTag);

    if (!info.hasVoted) {
      info.list.pushObject(info.user);
      model.save();
    }
  },
  actions: {
    test() {/*
      console.log(this.get('posts'));
      console.log(this.get('posts').objectAt(this.get('prevIndex')));
      console.log(this.get('posts').objectAt(this.get('myIndex')));
      console.log(this.get('posts').objectAt(this.get('nextIndex')));*/
    },
    doUpVote(model){
      this.doVote(model, 'upvoters');
    },
    doDownVote(model){
      this.doVote(model, 'downvoters');
    },
    postComment(postid,username) {
      // TODO: correct referential integrity - user
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
              }); // end return
            }); // end post.save
          }); // end comment.save
        }); // end findRecord(post)
      }); // end findRecord(user)
    }
  }
});
