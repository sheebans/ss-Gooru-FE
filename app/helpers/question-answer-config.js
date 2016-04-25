import Ember from 'ember';
import { getQuestionAnswerConfig } from "gooru-web/config/config";

export function questionAnswerConfig(value /*, options*/) {
  const questionType = value[0];
  const propertyPath = value.length > 1 ? value[1] : undefined;
  return getQuestionAnswerConfig(questionType, propertyPath);
}

export default Ember.Helper.helper(questionAnswerConfig);
