import Controller from '@ember/controller';
import sweetAlert from 'ember-sweetalert';

export default Controller.extend({
  queryParams: ['myIndex', 'posts'],
  myIndex: 0,
  posts: [],
  prevIndex: function(){
    return this.get('myIndex')-1;
  }.property('myIndex'),
  nextIndex: function(){
    return this.get('myIndex')+1;
  }.property('myIndex'),
  showPrevious: function (){
    if(this.get('prevIndex')>-1){
      return true;
      //console.log(this.get('posts').objectAt(this.get('prevIndex')));
    }else{
      return false;
    }
  }.property('prevIndex'),
  showNext: function (){
    if(this.get('nextIndex') < this.get('posts').get('length')){
      return true;
      //console.log(this.get('posts').objectAt(this.get('prevIndex')));
    }else{
      return false;
    }
  }.property('nextIndex', 'posts'),
  prevPost: function(){
    if(this.get('showPrevious')){
        return this.get('posts').objectAt(this.get('prevIndex'));
    }else {
      return null;
    }
  }.property('showPrevious','posts','prevIndex'),
  nextPost: function(){
    if(this.get('showNext')){
        return this.get('posts').objectAt(this.get('nextIndex'));
    }else {
      return null;
    }
  }.property('showNext','posts','nextIndex'),
  actions: {
    test() {/*
      console.log(this.get('posts'));
      console.log(this.get('posts').objectAt(this.get('prevIndex')));
      console.log(this.get('posts').objectAt(this.get('myIndex')));
      console.log(this.get('posts').objectAt(this.get('nextIndex')));*/
    },
    doUpVote(model){
      var tag = 'upVote';
      this.model.incrementProperty(tag);
      this.model.save();
      //alert(this.get(tag));
      //debugger;
    },
    doDownVote(model){
      var tag = 'downVote';
      this.model.incrementProperty(tag);
      this.model.save();
      //alert(this.get(tag));
      //debugger;
    },
    postComment(postid,username) {
      // TODO: correct referential integrity - user
      var self = this;
      this.store.findRecord('post', postid).then(function(post) {
        const comment = self.store.createRecord('comment', {
          comment: self.get('newcomment'),
          post: post,
          dateSubmitted: new Date(),
          user: username
        });
          comment.save().then(function(myComment) {
            self.set('newcomment', '');
            sweetAlert({'title': 'Comment Posted!', 'type': 'success', 'text': 'CommentID: ' + myComment.id});
          });
    });

// Alternative Tries to get user object

      // var s_user = this.get('store').findRecord('user', userid);
      // var s_post = this.get('store').findRecord('post', postid);
      //
      // const comment = self.store.createRecord('comment', {
      //   comment: self.get('newcomment'),
      //   post: s_post,
      //   dateSubmitted: new Date(),
      //   user: s_user
      // });
      //
      // comment.save().then(function(myComment) {
      //   sweetAlert({'title': 'Comment Posted!', 'type': 'success', 'text': 'CommentID: ' + myComment.id});
      // });


    // var s_user = this.store.query('user', {
    //           filter: {
    //             uid: userid
    //           }
    //         }).then(function(users) {
    //           return users;
    // });
    //
    // var s_post = this.store.query('post', {
    //           filter: {
    //             id: postid
    //           }
    //         }).then(function(posts) {
    //           return posts;
    // });
    //
    //
    // const comment = self.store.createRecord('comment', {
    //   comment: self.get('newcomment'),
    //   post: s_post,
    //   dateSubmitted: new Date(),
    //   user: s_user
    // });
    //
    // comment.save().then(function(myComment) {
    //   sweetAlert({'title': 'Comment Posted!', 'type': 'success', 'text': 'CommentID: ' + myComment.id});
    // });


    // const single_post = this.store.findRecord('post', postid);
    // const single_user = this.store.findRecord('user', userid);
    // const comment = self.store.createRecord('comment', {
    //   comment: self.get('newcomment'),
    //   post: single_post,
    //   dateSubmitted: new Date(),
    //   user: single_user
    // });
    // comment.save().then(function(myComment) {
    //   sweetAlert({'title': 'Comment Posted!', 'type': 'success', 'text': 'CommentID: ' + myComment.id});
    // });
    }
  }
});
