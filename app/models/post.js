import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  downloadURL: DS.attr('string'),
  dateSubmitted: DS.attr('date'),
<<<<<<< HEAD
  upVote: DS.attr('number'),
  downVote: DS.attr('number'),
  score: Ember.computed('upvoters', 'downvoters', function(){
    var uv = this.get('upvoters').content;
    var dv = this.get('downvoters').content;
    return uv.length-dv.length;
  }), // calculated value (upvoters - downvoters)
=======
  score: DS.attr('number'), // calculated value (upvoters - downvoters)
>>>>>>> master
  user: DS.belongsTo('user'),
  upvoters: DS.hasMany('user', {
    inverse: 'favorite_posts'
  }),
  downvoters: DS.hasMany('user', {
    inverse: 'disliked_posts'
  }),
  comments: DS.hasMany('comment') // probably should be an array of comment id's*/
});
