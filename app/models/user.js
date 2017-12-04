import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  displayName: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  bio: DS.attr('string'),
  memberSince: DS.attr('date'),
  post_score: DS.attr('number'), // TODO: calculated value of each posts score
  comment_score: DS.attr('number'), // TODO: calculated value of each comment score
  posts: DS.hasMany('post'),
  comments: DS.hasMany('comment'),
  favorite_posts: DS.hasMany('post', {
    inverse: 'upvoters'
  }),
  disliked_posts: DS.hasMany('post', {
    inverse: 'downvoters'
  }),
  favorite_comments: DS.hasMany('comment', {
    inverse: 'upvoters'
  }),
  disliked_comments: DS.hasMany('comment', {
    inverse: 'downvoters'
  })
});
