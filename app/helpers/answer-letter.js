import Ember from 'ember';

export function answerLetter(value) {
  return String.fromCharCode(65 + value[0]);
}

export default Ember.Helper.helper(answerLetter);
