import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    create() {
      var self = this;
      this.get('model.comment').save().then(function() {
        self.transitionToRoute('comments');
      });
    }
  }
});
