import Ember from 'ember';

export const QUESTION_CONFIG = {
  'MC'    : Ember.Object.create({
    component: {
      player : 'player.questions.gru-multiple-choice',
      report : 'reports.assessment.questions.gru-multiple-choice',
    }
  }),
  'MA'    : Ember.Object.create({
    component: {
      player: 'player.questions.gru-multiple-answer',
      report: 'reports.assessment.questions.gru-multiple-answer'
    }
  }),
  'T/F'   : Ember.Object.create({
    component: {
      player: 'player.questions.gru-true-false',
      report: 'reports.assessment.questions.gru-true-false'
    }
  }),
  'OE'    : Ember.Object.create({
    component: {
      player: 'player.questions.gru-open-ended',
      report: 'reports.assessment.questions.gru-open-ended'
    }
  }),
  'FIB'   : Ember.Object.create({
    component: {
      player: 'player.questions.gru-fib',
      report: 'reports.assessment.questions.gru-fib'
    }
  }),
  'HS_TXT': Ember.Object.create({
    component: {
      player: 'player.questions.gru-hs-text',
      report: 'reports.assessment.questions.gru-hs-text'
    }
  }),
  'HS_IMG': Ember.Object.create({
    component: {
      player: 'player.questions.gru-hs-image',
      report: 'reports.assessment.questions.gru-hs-image'
    }
  }),
  'HT_RO' : Ember.Object.create({
    component: {
      player: 'player.questions.gru-reorder',
      report: 'reports.assessment.questions.gru-reorder'
    }
  }),
  'HT_HL' : Ember.Object.create({
    component: {
      player: 'player.questions.gru-hot-text-highlight',
      report: 'reports.assessment.questions.gru-hot-text-highlight'
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
