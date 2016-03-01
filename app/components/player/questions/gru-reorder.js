import Ember from 'ember';
import QuestionComponent from './gru-question';

/**
 * Reorder Question
 *
 * Component responsible for controlling the logic and appearance of the answers for
 * a reorder question inside of the {@link player/gru-question-viewer.js}
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-question-viewer.js
 * @augments player/questions/gru-question.js
 */
export default QuestionComponent.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-reorder'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events
  initSortableList: Ember.on('didInsertElement', function() {
    const component = this;
    component.setAnswers();
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function() {
    this.$('.sortable').off('sortupdate');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Convenient structure to render the question answer choices
   * @property {*}
   */
  answers: Ember.computed("question.answers.[]", function(){
    let answers = this.get("question.answers").sortBy("order");
    let userAnswer = this.get("userAnswer");
    if (userAnswer){ //@see gooru-web/utils/question/reorder.js
      answers = userAnswer.map(function(answerId){
        return answers.findBy("id", answerId);
      });
    }
    return answers;
  }),

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Refresh items when the question changes
   */

  refreshAnswers: Ember.observer('question.id', function() {
    this.setAnswers();
  }),
  // -------------------------------------------------------------------------
  // Methods
  /**
   * Set answers
   */
  setAnswers: function(){
    const component = this;
    const sortable = this.$('.sortable');
    const questionUtil = this.get("questionUtil");
    const readOnly = component.get("readOnly");

    sortable.sortable();
    if (readOnly){
      sortable.sortable('disable');
    }


    // Manually add subscriptions to sortable element -makes it easier to test
    sortable.on('sortupdate', function() {

      const $items = component.$('.sortable').find('li');
      const answers = $items.map(function(idx, item) {
        return $(item).data('id');
      }).toArray();


      const correct = questionUtil.isCorrect(answers);

      component.notifyAnswerChanged(answers, correct);
      component.notifyAnswerCompleted(answers, correct);
    });
  }
});
