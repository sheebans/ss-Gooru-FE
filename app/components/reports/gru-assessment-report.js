import Ember from 'ember';

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
        $('.gru-assessment-report').animate({
          scrollTop: $el.offset().top
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
  // Events
  /**
   * Listening for model to update component properties
   */
  onInit: Ember.on("init", function(){
    if (this.get("model")){
      this.set("assessmentResult", this.get("model").assessmentResult);
    }
  }),

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
  orderedQuestions: Ember.computed('assessmentResult.questionResults[]', function() {
    return this.get('assessmentResult.questionResults').sort(function(a, b){
      return a.get('question.order')-b.get('question.order');
    });
  })
});
