import Ember from 'ember';
import QuestionComponent from './gru-question';

/**
 * Multiple Answer Question
 *
 * Component responsible for controlling the logic and appearance of a multiple
 * answer question inside of the {@link player/gru-question-viewer.js}
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-question-viewer.js
 * @augments Ember/Component
 */
export default QuestionComponent.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-multiple-answer'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * When the user changes the answer choice selection
     * @param {string} answerId
     */
    selectAnswerChoice: function(answerId){
      const component = this;
      const questionUtil = component.get("questionUtil");
      component.setUserAnswerChoice(answerId);

      let userAnswer = this.get("userAnswer").toArray();
      const correct = questionUtil.isCorrect(userAnswer);

      component.notifyAnswerChanged(userAnswer, correct);

      if (component.isAnswerCompleted()){
        component.notifyAnswerCompleted(userAnswer, correct);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property { { id: number, selection: boolean }[] } userAnswer
   */
  userAnswer: Ember.A([]),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates when the answer is completed
   * @return {boolean}
   */
  isAnswerCompleted: function(){
    const component = this,
      userAnswer = component.get("userAnswer"),
      totalAnswerChoices = component.get("question.answers.length");
    return userAnswer.get("length") === totalAnswerChoices;
  },

  /**
   * Sets the user answer choice
   * @param {string} answerChoice containing the user selection yes|120202 or no|20200392
   */
  setUserAnswerChoice: function(answerChoice){
    let userAnswer = this.get("userAnswer");
    let values = answerChoice.split("|");
    let id = values[1];
    let selection = values[0] === "yes";
    let found = userAnswer.findBy("id", id);
    if (found){
      found.selection = selection;
    }
    else{
      userAnswer.addObject({
        id: id,
        selection: selection
      });
    }

  }

});
