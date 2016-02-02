import Ember from 'ember';

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
    questions:Ember.computed('learningTarget', function() {
      return this.getQuestions(this.get("assessmentResult.questionsResults"));
    }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Return a list of questions associated a specific learning target to be used by the gru-bubbles component
   * @prop {Object[]}
   */
  getQuestions: function (questionResults) {
    var questions = [];
    let relatedQuestions=this.get('learningTarget.relatedQuestions');

    relatedQuestions.forEach(function(questionId){
      let question=questionResults.findBy('id',questionId);
      if(question!=null){
        questions.push(question);
      }
    });
    return questions.map(function (questionResult) {
      return {
        label: questionResult.question.order,
        status: questionResult.correct ? 'correct' : 'incorrect',
        value: questionResult.id
      };
    });
  }

});
