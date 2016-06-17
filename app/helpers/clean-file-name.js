import Ember from 'ember';
import { cleanFilename } from 'gooru-web/utils/utils';

export function cleanFileName(value/*, hash*/) {
  return cleanFilename(value);
}

export default Ember.Helper.helper(cleanFileName);
