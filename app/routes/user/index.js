import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    console.log(params);
    return this.store.query('user', {
      orderBy: 'email',
      equalTo: 'romerom@gmail.com'
    }).then(function(users){
      return users.get('firstObject');
    }).then(function(user){
      return user
    });
  }
});
