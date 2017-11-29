import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  modelDesc: ['dateSubmitted:desc'],
  sortedModel: Ember.computed.sort('model', 'modelDesc')
});
