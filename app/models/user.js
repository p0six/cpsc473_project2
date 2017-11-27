import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'), // how can we ensure this is unique?
  pw_hash: DS.attr('string'), // unsure here..
  email: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  bio: DS.attr('string'),
  memberSince: DS.attr('date'),
  post_score: DS.attr('number'), // calculated value of each posts score
  comment_score: DS.attr('number'), // calculated value of each comment score
  posts: DS.hasMany('post'), //  needs to be an array of post id's...
  favorite_posts: DS.hasMany('post', {inverse: 'upvoters'}), // should be an array of post id's..
  disliked_posts: DS.hasMany('post', {inverse: 'downvoters'}), // should be an array of post id's..
  favorite_comments: DS.hasMany('comment', {inverse: 'upvoters'}),
  disliked_comments: DS.hasMany('comment', {inverse: 'downvoters'}),
  comments: DS.hasMany('comment') // should be an array of comment ids
});
