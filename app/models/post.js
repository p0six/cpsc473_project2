import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  downloadURL: DS.attr('string'),
  dateSubmitted: DS.attr('date'),
  score: DS.attr('number'), // calculated value (upvoters - downvoters)
  user: DS.belongsTo('user')
  // upvoters: DS.hasMany('user', {inverse: 'favorite_posts'}), // array of user id's
  // downvoters: DS.hasMany('user', {inverse: 'disliked_posts'}), // array of user id's
  // comments: DS.hasMany('comment') // probably should be an array of comment id's*/
});
