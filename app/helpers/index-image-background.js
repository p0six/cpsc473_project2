import { helper } from '@ember/component/helper';
import Ember from 'ember';

export function indexImageBackground(params /*, hash*/ ) {
  return Ember.String.htmlSafe("background-image: url(" + params[0] + ')')
}

export default helper(indexImageBackground);
