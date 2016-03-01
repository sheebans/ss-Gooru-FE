import Ember from 'ember';
import MultipleChoiceUtil from 'gooru-web/utils/question/multiple-choice';
import MultipleAnswerUtil from 'gooru-web/utils/question/multiple-answer';
import TrueFalseUtil from 'gooru-web/utils/question/true-false';
import OpenEndedUtil from 'gooru-web/utils/question/open-ended';
import FillInTheBlankUtil from 'gooru-web/utils/question/fill-in-the-blank';
import ReorderUtil from 'gooru-web/utils/question/reorder';
import HotSpotImageUtil from 'gooru-web/utils/question/hot-spot-image';
import HotSpotTextUtil from 'gooru-web/utils/question/hot-spot-text';
import HotTextHighlightUtil from 'gooru-web/utils/question/hot-text-highlight';

export const QUESTION_CONFIG = {
  'MC'    : Ember.Object.create({
    util: MultipleChoiceUtil,
    component: {
      player: 'player.questions.gru-multiple-choice',
      answer: 'reports.assessment.questions.gru-multiple-choice',
    }
  }),
  'MA'    : Ember.Object.create({
    util: MultipleAnswerUtil,
    component: {
      player: 'player.questions.gru-multiple-answer',
      answer: 'reports.assessment.questions.gru-multiple-answer',
    }
  }),
  'T/F'   : Ember.Object.create({
    util: TrueFalseUtil,
    component: {
      player: 'player.questions.gru-true-false',
      answer: 'reports.assessment.questions.gru-true-false',
    }
  }),
  'OE'    : Ember.Object.create({
    util: OpenEndedUtil,
    component: {
      player: 'player.questions.gru-open-ended',
      answer: 'reports.assessment.questions.gru-open-ended',
    }
  }),
  'FIB'   : Ember.Object.create({
    util: FillInTheBlankUtil,
    component: {
      player: 'player.questions.gru-fib',
      answer: 'reports.assessment.questions.gru-fib',
    }
  }),
  'HS_TXT': Ember.Object.create({
    util: HotSpotTextUtil,
    component: {
      player: 'player.questions.gru-hs-text',
      answer: 'reports.assessment.questions.gru-hs-text',
    }
  }),
  'HS_IMG': Ember.Object.create({
    util: HotSpotImageUtil,
    component: {
      player: 'player.questions.gru-hs-image',
      answer: 'reports.assessment.questions.gru-hs-image',
    }
  }),
  'HT_RO' : Ember.Object.create({
    util: ReorderUtil,
    component: {
      player: 'player.questions.gru-reorder',
      answer: 'reports.assessment.questions.gru-reorder',
    }
  }),
  'HT_HL' : Ember.Object.create({
    util: HotTextHighlightUtil,
    component: {
      player: 'player.questions.gru-hot-text-highlight',
      answer: 'reports.assessment.questions.gru-hot-text-highlight',
    }
  })
};

/**
 * Returns the question config information
 * @param {string} questionType
 * @param {string} propertyPath a valid property path inside the question config object
 */
export function getQuestionConfig(questionType, propertyPath){

  let config = QUESTION_CONFIG[questionType];
  if (!config) {
    Ember.Logger.error('Questions of type ' + questionType + ' are currently not supported');
  }
  else if (propertyPath && !config.get(propertyPath)){
    Ember.Logger.error('Property not found ' + propertyPath + ' for question type ' + questionType);
  }
  else{
    config = propertyPath ? config.get(propertyPath) : config;
  }

  return config;
}

/**
 * Gets the question util per question type
 * @param {string} questionType
 * @returns {Object|*}
 */
export function getQuestionUtil(questionType){
  return getQuestionConfig(questionType, 'util');
}

