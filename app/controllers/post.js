import Controller from '@ember/controller';
import Ember from 'ember';

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
      debugger;
      var tag = 'upvoters';
      var idTag = 'email';
      var user = model.get('user').content;
      var userId = user.get(idTag);
      var list = model.get(tag);
      list.pushObject(user);
      list.forEach(function(i){
        var itemId = i.get(idTag)
        //console.log(i.email);
      });
      model.save();

      /*var tag = 'upVote';
      this.model.incrementProperty(tag);
      this.model.save();*/
      //alert(this.get(tag));
      //debugger;
    },
    doDownVote(model){
      var tag = 'downVote';
      this.model.incrementProperty(tag);
      this.model.save();
      //alert(this.get(tag));
      //debugger;
    }
  }

});
