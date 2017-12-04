import DS from 'ember-data';

export default DS.Model.extend({
//  TODO: correct referential integrity - user
  // user: DS.belongsTo('user'),
  user: DS.attr('string'),
  post: DS.belongsTo('post'),
  comment: DS.attr('string'),
  dateSubmitted: DS.attr('date'),
  score: DS.attr('number'),
  upvoters: DS.hasMany('user', {inverse: 'favorite_comments'}),
  downvoters: DS.hasMany('user', {inverse: 'disliked_comments'})
});
