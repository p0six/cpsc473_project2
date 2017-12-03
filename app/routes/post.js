import Route from '@ember/routing/route';

export default Route.extend({
  queryParams:{
    myIndex:{
      refreshModel: true,
      replace: true
    },
    posts:{
      refreshModel: true,
      replace: true
    }
  },
  model(params){
      return this.store.findRecord('post', params.post_id);
  }
});
