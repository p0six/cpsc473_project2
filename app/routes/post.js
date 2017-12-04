import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model(params){
       return this.store.findRecord('post', params.post_id);
  },
  beforeModel(){
    return this.store.query('comment', {
      orderBy: 'dateSubmitted'/*,
      limitToLast: 15 */
    });
  },
  afterModel(){
    return Ember.RSVP.hash({
      comment: this.store.createRecord('comment')
  })
}
});
