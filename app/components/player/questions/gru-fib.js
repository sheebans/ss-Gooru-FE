import Ember from 'ember';
import QuestionComponent from './gru-question';

export default QuestionComponent.extend({
// -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes
  classNames:['gru-fib'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    fillAnswer:function(){

    }
  },


  // -------------------------------------------------------------------------
  // Events
  fillAnswers: function() {
    const component = this;
      const answers = this.$(".gru-fib").find(".inputs input[type=text]");
      component.notifyAnswerChanged(answers);
      component.notifyAnswerCompleted(answers);
  }.on('keyPress'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Replace "_______" to an input
   * @param question
   *
   */
  answers: Ember.computed('question', function() {
    const component = this;
    var answers = component.get("question.text");
    return answers.replace(/_______/g, "<input type=\"text\"/>");
  }),
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
});
