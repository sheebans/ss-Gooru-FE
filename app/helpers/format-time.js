import Ember from 'ember';
import { formatTime as formatMilliseconds } from 'gooru-web/utils/utils';

export function formatTime(value /*, hash*/) {
  var timeInSeconds = value[0];
  return formatMilliseconds(timeInSeconds * 1000);
}

export default Ember.Helper.helper(formatTime);
