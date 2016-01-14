import Ember from 'ember';
import { getGradeBracket } from 'gooru-web/utils/utils';

/**
 * Get the grade bracket that a score falls under per the app's grading scale (@see /app/config/config.js#GRADING_SCALE)
 *
 * This helper is useful in templates for customizing an appearance based on the grade bracket
 * @example
 *
 * Based on a score value, the DIV element may be styled differently
 * <div class="grade bg-grade-bracket-{{gradeBracket score}}">
 *  ...
 * </div>
 * @see /app/templates/components/reports/assessment/gru-summary.hbs#L1
 *
 * @param value
 * @returns {Number}
 */

export function gradeBracket(value /*, hash*/) {
  return getGradeBracket(value[0]);
}

export default Ember.Helper.helper(gradeBracket);
