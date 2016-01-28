import Ember from 'ember';
import {HEADER_HEIGHT} from "gooru-web/config/config";

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-summary
     * Scroll to specific question
     */
    bubbleSelect:function(bubbleOption) {
      $('html, body').animate({
        scrollTop: $(".gru-questions table tbody tr:nth-child("+bubbleOption.label+")").offset().top - HEADER_HEIGHT
      }, 1000);
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'gru-assessment-report'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {AssessmentResult} assessment
   */
  assessmentResult: null,

  /**
   * Return ordered questions array
   * @return {Ember.Array}
   */
  orderedQuestions: Ember.computed('assessmentResult.questionsResults[]', function() {
    return this.sortQuestions(this.get('assessmentResult.questionsResults'));
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Sort questions array
   */
  sortQuestions: function (questionsArray) {
   return questionsArray.sort(function(a, b){
      return a.question.order-b.question.order;
    });
  }
});
