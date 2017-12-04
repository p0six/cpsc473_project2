import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  modelAesc: ['score'],
  modelDesc: ['dateSubmitted:desc'],
  isSortedBy: function(){
    return this.get('modelDesc');
  }.property('modelAesc'),
  sortedModel: Ember.computed.sort('model.posts', 'isSortedBy'),
  postIDs: function(){
    var posts = this.get('sortedModel').map(function(item) {
      return item.id;
    });
    return posts;
  }.property('sortedModel'),
  actions: {
    isSortedByAesc() {
      this.set('isSortedBy', function(){
        return this.get('modelAesc');
      }.property('modelAesc'));
    },
    isSortedByDesc() {
      this.set('isSortedBy', function(){
        return this.get('modelDesc');
      }.property('modelDesc'));
    },
    test(){
    }
  }
});
