import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model(params){
    return Ember.RSVP.hash({
      post: this.store.findRecord('post', params.post_id),
      comment: this.store.createRecord('comment'),
      comments: this.store.query('comment', {
        orderBy: 'post',
        equalTo: params.post_id
      }).then(function(myComments) {
        return myComments;
      })
    });
  }
});
