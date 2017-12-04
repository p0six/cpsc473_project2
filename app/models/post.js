import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  downloadURL: DS.attr('string'),
  dateSubmitted: DS.attr('date'),
  upVote: DS.attr('number'),
  downVote: DS.attr('number'),
  score: Ember.computed('upvoters', 'downvoters', function(){
    var uv = this.get('upvoters').content;
    var dv = this.get('downvoters').content;
    return uv.length-dv.length;
  }), // calculated value (upvoters - downvoters)
  user: DS.belongsTo('user'),
  upvoters: DS.hasMany('user', {inverse: 'favorite_posts'}), // array of user id's
  downvoters: DS.hasMany('user', {inverse: 'disliked_posts'}), // array of user id's
  comments: DS.hasMany('comment') // probably should be an array of comment id's*/
});
