import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-summary
     * Scroll to specific question
     * TODO make this method generic
     */
    bubbleSelect: function(bubbleOption) {
      const animationSpeed = 1000;  // milliseconds
      const selectorTable = $(".gru-assessment-report .gru-questions table:visible tbody tr:nth-child(" + bubbleOption.label + ")");
      const $elTable = $(selectorTable);

      const selectorList = $(".gru-assessment-report .gru-questions .question-cards-list:visible li:nth-child(" + bubbleOption.label + ") .question-card");
      const $elList = $(selectorList);

      const isModal=$('.gru-assessment-report').parents('.gru-modal');
      //Check if the assessment report is showing into a modal
      if(isModal.length){
        if ($elTable.length) {
          $('.gru-modal').animate({
            scrollTop: $elTable.offset().top -   $('.gru-modal').offset().top
          }, animationSpeed);
        }
      }else{
        //Check if the questions details are showing on table (md or sm devices) or  a list (xs devices)
        if ($elTable.length) {
          $('.gru-assessment-report').animate({
            scrollTop: $elTable.offset().top
          }, animationSpeed);
        } else  if ($elList.length) {
          $('.gru-assessment-report').animate({
            scrollTop: $elList.offset().top
          }, animationSpeed);
        }else {
          Ember.Logger.error("No element was found for selectorTable: " + selectorTable);
        }
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
