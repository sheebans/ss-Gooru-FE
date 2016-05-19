import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember';

export default BaseValidator.extend({
  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * Performs the string validation
   * @param {String} value The string to validate
   * @param {Object} options Validation options
   * @param {Object} model Answer model
   * @returns {Boolean|String} Validity of answer or error message
   */
  validate(value, options, model) {
    const validator = this;
    const highlightType = model.get('highlightType');
    if (highlightType) {
      let containsOpeningBracket = value.indexOf('[') >= 0;
      let containsEndingBracket = value.indexOf(']') >= 0;
      if (!containsOpeningBracket && !containsEndingBracket) {
        return validator.get('i18n').t(options.answerNotSelectedKey).string;
      } else {
        if (!validator.bracketsAreBalanced(value)) {
          return validator.get('i18n').t(options.wrongFormatKey).string;
        } else {
          if (!validator.validateSelections(value, highlightType)) {
            return validator.get('i18n').t(options.wrongFormatKey).string;
          }
        }
      }
    }
    return true;
  },

  /**
   * Checks that the brackets in the string are properly opened and closed
   * @returns {Boolean} String is bracket balanced
   */
  bracketsAreBalanced(string) {
    const brackets = "[]";
    var stack = [];
    var i, character, bracePosition;

    for (i = 0; character = string[i]; i++) {
      bracePosition = brackets.indexOf(character);
      if (bracePosition === -1) {
        continue;
      }
      if (bracePosition % 2 === 0) {
        stack.push(bracePosition + 1);
      } else {
        if (stack.pop() !== bracePosition) {
          return false;
        }
      }
    }
    return stack.length === 0;
  },

  /**
   * Validates that words or sentences are properly set in the text
   * @param {String} string The text to validate
   * @param {String} type The type of selection: word or sentence
   * @returns {Boolean} Validity of the answers
   */
  validateSelections(string, type) {
    var isValid = true;
    const regExp = /\[(.*?)\]/gi;
    const matchedAnswers = string.match(regExp);
    for (var i = 0; i < matchedAnswers.length; i++) {
      let selection = matchedAnswers[i].substring(1, matchedAnswers[i].length - 1).trim();
      if (selection === '') {
        return false;
      }
      if (type === "word") {
        if (selection.match(/(\.|\s)/)) {
          return false;
        }
      } else {
        if (selection.indexOf(" ") === -1 || selection.indexOf(".") === -1) {
          return false;
        }
      }
    }
    return isValid;
  }
});
