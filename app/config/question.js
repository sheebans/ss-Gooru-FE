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


//Question Types
export const QUESTION_TYPES = {
  multipleChoice: "MC",
  multipleAnswer: "MA",
  trueFalse: "T/F",
  openEnded: "OE",
  fib: "FIB",
  hotSpotText: "HS_TXT",
  hotSpotImage: "HS_IMG",
  hotTextReorder: "HT_RO",
  hotTextHighlight: "HT_HL"
};

//Question type configuration
export const QUESTION_CONFIG = {
  "MC"    : Ember.Object.create({
    apiType: 'multiple_choice_question',
    util: MultipleChoiceUtil,
    component: {
      player: 'player.questions.gru-multiple-choice',
      answer: 'reports.assessment.questions.gru-multiple-choice',
    }
  }),
  "MA"    : Ember.Object.create({
    apiType: 'multiple_answer_question',
    util: MultipleAnswerUtil,
    component: {
      player: 'player.questions.gru-multiple-answer',
      answer: 'reports.assessment.questions.gru-multiple-answer',
    }
  }),
  "T/F"   : Ember.Object.create({
    apiType: 'true_false_question',
    util: TrueFalseUtil,
    component: {
      player: 'player.questions.gru-true-false',
      answer: 'reports.assessment.questions.gru-true-false',
    }
  }),
  "OE"    : Ember.Object.create({
    apiType: 'open_ended_question',
    util: OpenEndedUtil,
    component: {
      player: 'player.questions.gru-open-ended',
      answer: 'reports.assessment.questions.gru-open-ended',
    }
  }),
  "FIB"   : Ember.Object.create({
    apiType: 'fill_in_the_blank_question',
    util: FillInTheBlankUtil,
    component: {
      player: 'player.questions.gru-fib',
      answer: 'reports.assessment.questions.gru-fib',
    }
  }),
  "HS_TEXT" : Ember.Object.create({
    apiType: 'hot_spot_text_question',
    util: HotSpotTextUtil,
    component: {
      player: 'player.questions.gru-hs-text',
      answer: 'reports.assessment.questions.gru-hs-text',
    }
  }),
  "HS_IMG"  : Ember.Object.create({
    apiType: 'hot_spot_image_question',
    util: HotSpotImageUtil,
    component: {
      player: 'player.questions.gru-hs-image',
      answer: 'reports.assessment.questions.gru-hs-image',
    }
  }),
  "HT_RO"   : Ember.Object.create({
    apiType: 'hot_text_reorder_question',
    util: ReorderUtil,
    component: {
      player: 'player.questions.gru-reorder',
      answer: 'reports.assessment.questions.gru-reorder',
    }
  }),
  'HT_HL' : Ember.Object.create({
    apiType: 'hot_text_highlight_question',
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
 * Returns the question type based on apiType
 * @param {string} apiType, a valid question apiType from API 3.0
 */
export function getQuestionTypeByApiType(apiType){
  let type = null;
  for (var property in QUESTION_CONFIG) {
    if (QUESTION_CONFIG.hasOwnProperty(property)) {
      if (QUESTION_CONFIG[property].apiType === apiType){
        type = property;
        break;
      }
    }
  }
  return type;
}

/**
 * Gets the question util per question type
 * @param {string} questionType
 * @returns {Object|*}
 */
export function getQuestionUtil(questionType){
  return getQuestionConfig(questionType, 'util');
}

/**
 * Returns the new question api type for API 3.0
 * @param {string} questionType
 * @returns {string}
 */
export function getQuestionApiType(questionType){
  return getQuestionConfig(questionType, 'apiType');
}

