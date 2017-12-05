import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  queryParams:{
    myIndex:{
      refreshModel: true,
      replace: true
    },
    posts:{
      refreshModel: true,
      replace: true
    }
  },
  model(params) {
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
  },
  beforeModel(){
    return this.store.query('comment', {
      orderBy: 'dateSubmitted'/*,
      limitToLast: 15 */
    });
  },
  actions: {
    refreshModel() { // took a while to figure this one out :D
      this.refresh();
    }
  }
});
