import DS from 'ember-data';

export default DS.Model.extend({
  /*post_id: DS.attr('number'),*/
  title: DS.attr('string'),
  imgUrl: DS.attr('string'),
  dateSubmitted: DS.attr('date'),
  score: DS.attr('number'), // calculated value (upvoters - downvoters)
  user: DS.belongsTo('user'),
  upvoters: DS.hasMany('user', {inverse: 'favorite_posts'}), // array of usernames
  downvoters: DS.hasMany('user', {inverse: 'disliked_posts'}), // array of usernames
  comments: DS.hasMany('comment') // probably should be an array of comment id's*/
});
