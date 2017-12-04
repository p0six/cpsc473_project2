import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    var parentModel = this.modelFor('user');
    return this.store.query('user', {
      orderBy: 'email',
      equalTo: parentModel.email
    }).then(function(users){
      return users.get('firstObject');
    }).then(function(user){
      return user
    });
  }
});
