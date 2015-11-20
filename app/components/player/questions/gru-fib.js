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
    const answers =[];
    const component = this;
      const inputs = this.$().find(".fib-answers input[type=text]");
      inputs.each(function(input){
        answers.push(input.val());
      });

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
  answers: Ember.computed('question.text', function() {
    const component = this;
    var answers = component.get("question.text");
    return answers.replace(/_______/g, "<input type=\"text\" value=\"\"/>");
  }),
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
});
