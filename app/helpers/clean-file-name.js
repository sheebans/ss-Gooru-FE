import Ember from 'ember';
import { getFileNameFromUrl } from 'gooru-web/utils/utils';

export function cleanFileName(value/*, hash*/) {
  return getFileNameFromUrl(value);
}

export default Ember.Helper.helper(cleanFileName);
