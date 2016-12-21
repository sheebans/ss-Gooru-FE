import Ember from 'ember';
import { getLetter } from 'gooru-web/utils/utils';

export function safeHtml(value) {
  return Ember.String.htmlSafe(value);
}

export default Ember.Helper.helper(safeHtml);
