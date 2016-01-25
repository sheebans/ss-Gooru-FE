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

/**
 * Format a certain number of milliseconds to a string of the form
 * '<hours>h <min>m or <min>m <sec>s'. If the value is falsey, a string
 * with the value '--' is returned
 * @param timeInMillis - time value in milliseconds
 * @returns {String}
 */
export function formatTime(timeInMillis) {
  var result = '';
  var secs;

  if (timeInMillis) {
    secs = timeInMillis / 1000;
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
  } else {
    result = '&mdash;';
  }

  return result;
}

/**
 * Format a certain number of seconds to a string of the form
 * '<hours>h <min>m or <min>m <sec>s'. If the value is falsey, a string
 * with the value '--' is returned
 * @param timeInSeconds - time value in seconds
 * @returns {String}
 */
export function formatTimeInSeconds(timeInSeconds) {
  return formatTime(timeInSeconds * 1000);
}

/**
 * Find the color corresponding to the grade bracket that a specific grade belongs to
 * @see gooru-web/config/config#GRADING_SCALE
 * @param grade
 * @returns {String} - Hex color value
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
/**
 * Convert a number into Upper Letter
 * @param number
 * @returns {string}
 */
export function getLetter(number){
  return String.fromCharCode(65 + number);
}

/**
 * Formats a date into a string
 * @param {Date} date
 * @param {string} format
 */
export function formatDate(date, format) {
  format = format || 'dddd, MMMM Do, YYYY h:mm A';
  return moment(date).format(format);
}
/**
 * Formats the  Unit, Lesson, Assessment and Collection label
 * @param {number} index
 * @param {string} type
 * @param {service} i18n
 */
export function courseSectionsPrefix(index,type,i18n){
  var prefixIndex = ++index;

  const i18nKey = `common.${type}Initial`;
  const letter = i18n.t(i18nKey);

  return `${letter}${prefixIndex}`;
}
