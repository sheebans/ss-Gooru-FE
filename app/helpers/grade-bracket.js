import Ember from 'ember';
import { getGradeBracket } from 'gooru-web/utils/utils';

export function gradeBracket(value /*, hash*/) {
  return getGradeBracket(value[0]);
}

export default Ember.Helper.helper(gradeBracket);
