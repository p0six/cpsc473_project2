import Controller from '@ember/controller';

export default Controller.extend({
  isShowingModal: true,
  actions: {
    showModalDialog(message) {
      this.set('modalMessage', message);
      this.set('isShowingModal', true);
    },
    closeModalDialog() {
      this.set('isShowingModal', false);
    }
  }
});
