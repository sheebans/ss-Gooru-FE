import Ember from 'ember';

import { correctAnswers,correctPercentage } from 'gooru-web/utils/question-details-result';

/**
 * Learning Target Component
 *
 * Component responsible to display the details for a learning target
 *
 * @module
 * @augments Ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-bubbles
     */
    bubbleSelect:function(bubbleOption) {
      this.sendAction("onBubbleSelect", bubbleOption);
    }
  },

    // -------------------------------------------------------------------------
    // Attributes

    classNames: ['reports', 'assessment', 'gru-learning-target'],

    // -------------------------------------------------------------------------
    // Properties

    /**
     * Learning target to be displayed by the component
     *
     * @property {Ember.Object}
     */
    learningTarget:null,


  /**
   * @property {AssessmentResult} assessment
   */
    assessmentResult:null,

  /**
   * Concise model to be used by the gru-bubbles component
   * @prop {Object[]}
   */
    bubbleQuestions:Ember.computed('learningTarget.relatedQuestions.[]', 'assessmentResult.questionsResults.[]', function() {
      return this.getBubblesQuestions(this.get("assessmentResult.questionsResults"));
    }),
  /**
   * List of questions
   * @prop {Ember.Array}
   */
    questionsList:Ember.computed('assessmentResult.questionsResults.[]',function(){
       return this.getQuestions(this.get("assessmentResult.questionsResults"));
    }),
  /**
   * Number of questions answered correctly in this attempt
   * @prop {Number}
   */
  correctAnswers:Ember.computed('questionsList.[]',function(){
    return correctAnswers(this.get('questionsList'));
  }),


  /**
   * Percentage of correct answers vs. the total number of questions
   * @prop {Number}
   */
  correctPercentage:Ember.computed('questionsList.[]','correctAnswers.[]',function(){
    return correctPercentage(this.get('questionsList'),this.get('correctAnswers'));
  }),


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Return a list of questions associated a specific learning target to be used by the gru-bubbles component
   * @param QuestionDetailsResult[]
   */
  getBubblesQuestions: function (questionResults) {

    let results = this.getQuestions(questionResults);

    return results.map(function (questionResult) {
      return {
        label: questionResult.get('question.order'),
        status: questionResult.get('correct') ? 'correct' : 'incorrect',
        value: questionResult.get('id')
      };
    });
  },

  getQuestions:function(questionResults){
    let relatedQuestions= this.get('learningTarget.relatedQuestions');

    let questions = questionResults.filter(function(questionResult){
      return relatedQuestions.contains(questionResult.get("id"));
    });
    return questions;
  }

});
