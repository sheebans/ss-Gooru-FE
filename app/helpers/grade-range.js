import Ember from 'ember';
import { getGradeRange } from 'gooru-web/utils/utils';

/**
 * Get the color for the grade bracket that a score falls under per the app's grading scale (@see /app/config/config.js#GRADING_SCALE)
 *
 * @example
 *
 * Based on a score value, the report icon show differently
 *
 * @see /app/templates/components/cards/gru-class-card.hbs#L1
 *
 * @param value - score within the grading scale
 * @returns {String} - range string
 */
export function gradeRange(params /*, hash*/) {
  return Ember.String.htmlSafe(getGradeRange(params[0]));
}

export default Ember.Helper.helper(gradeRange);
