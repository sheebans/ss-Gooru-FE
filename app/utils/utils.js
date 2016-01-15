import Ember from 'ember';
import { roundFloat, isNumeric } from './math';
import { GRADING_SCALE } from 'gooru-web/config/config';

/**
 * Check the standards that are checkable against the codes (provided by user)
 * and disable those who are not in codes arrays.
 * @param standards
 * @param checkableStandards
 * @param codes
 */
export function checkStandards(standards, checkableStandards, codes) {
  standards.forEach(function(standard) {
    if (checkableStandards.contains(standard.get("id"))) {
      standard.set("disabled", !codes.contains(standard.get("id")));
    }
  });
}

export function formatTime(timeInMillis) {
  var result = '';
  var secs = timeInMillis / 1000;
  const hours = secs / 3600;
  secs = secs % 3600;
  const mins = secs / 60;
  secs = secs % 60;

  if (hours >= 1) {
    result = roundFloat(hours) + 'h ';
    if (mins >= 1) {
      result += roundFloat(mins) + 'm';
    }
  } else {
    if (mins >= 1) {
      result = roundFloat(mins) + 'm ';
    }
    if (secs >= 1) {
      result += roundFloat(secs) + 's';
    }
  }

  return result;
}

/**
 * Find the number of the grade bracket that the grade belongs to
 * @see gooru-web/config/config#GRADING_SCALE
 * @param grade
 * @returns {number}
 */
export function getGradeColor(grade) {
  var bracket = GRADING_SCALE.length - 1;
  var color = '#999999';  // Default color

  if (isNumeric(grade)) {

    for (; bracket >= 0; bracket--) {
      if (grade >= GRADING_SCALE[bracket].LOWER_LIMIT) {
        color = GRADING_SCALE[bracket].COLOR;
        break;
      }
    }

  } else {
    Ember.Logger.error('Grade value: ' + grade + ' is not a numeric value');
  }
  return color;
}
