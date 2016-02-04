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
    bubbleSelect: function(bubbleOption) {
      const animationSpeed = 1000;  // milliseconds
      const selector = $(".gru-questions table tbody tr:nth-child(" + bubbleOption.label + ")");
      const $el = $(selector);

      if ($el.length) {
        $('html, body').animate({
          scrollTop: $el.offset().top - HEADER_HEIGHT
        }, animationSpeed);
      } else {
        Ember.Logger.error("No element was found for selector: " + selector);
      }
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
    return this.get('assessmentResult.questionsResults').sort(function(a, b){
      return a.get('question.order')-b.get('question.order');
    });
  }),
});
