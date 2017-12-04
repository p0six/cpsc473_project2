import Controller from '@ember/controller';
import sweetAlert from 'ember-sweetalert';

export default Controller.extend({
  actions: {
    create() {
        var self = this;
        this.store.createRecord('user', this.get('session.currentUser.uid')).then(function(u) {
        u.set('displayName', self.get('model.displayName'));
        u.set('firstName', self.get('model.firstName'));
        u.set('bio', self.get('model.bio'));
        u.set('lastName', self.get('model.lastName'));
        u.save();
      });
      sweetAlert({'title': 'Profile Updated Successfully!', 'type': 'success'});
      this.transitionToRoute('index');
    },
    cancelUpdateUser() {
        this.transitionToRoute('index');
    }
  }
});
