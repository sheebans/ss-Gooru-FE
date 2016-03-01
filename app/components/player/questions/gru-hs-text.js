import Ember from 'ember';
import QuestionComponent from './gru-question';
/**
 * Hot Spot Text
 *
 * Component responsible for controlling the logic and appearance of a hot spot
 * text question inside of the {@link player/gru-question-viewer.js}
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-question-viewer.js
 * @augments Ember/Component
 */
export default QuestionComponent.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-hs-text'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events
  setupInstanceProperties: Ember.on('init', function () {
    const component = this;
    component.setAnswers();
  }),

  setupSubscriptions: Ember.on('didInsertElement', function () {
    const component = this;
    const readOnly = component.get("readOnly");

    component.setUserAnswer();

    if (!readOnly){
      this.$('li.answer').on('click', function () {
        const $this = $(this);
        const answerId = $this.data('id');
        const questionUtil = component.get("questionUtil");

        var selected = component.get('selectedAnswers');
        var idx = selected.indexOf(answerId);

        $this.toggleClass('selected');

        if (idx === -1) {
          selected.push(answerId);
        } else {
          selected.splice(idx, 1);
        }

        let cleared = !selected.length;
        const correct = questionUtil.isCorrect(selected);

        component.notifyAnswerChanged(selected, correct);
        if (cleared) {
          component.notifyAnswerCleared(selected);
        }
        else {
          component.notifyAnswerCompleted(selected, correct);
        }
      });
    }

  }),

  removeSubscriptions: Ember.on('willDestroyElement', function () {
    this.$('li.answer').off('click');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /*
   * @prop {Array} selectedAnswers - Array of ids for each one of the answers selected by the user
   */
  selectedAnswers: null,

  /*
   * @prop {String} instructions - Question instructions
   */
  instructions: Ember.computed(function () {
    return this.get('i18n').t('gru-hs-text.instructions');
  }),

  /*
   * @typedef answers
   * @prop {String} id - answer id
   * @prop {String} content - markup string containing the answer text
   */
  answers: Ember.computed.map('question.answers', function (answer) {
    return {
      id: answer.get('id'),
      content: answer.get('text')
    };
  }),

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Set the user answer
   */
  setUserAnswer: function(){
    const userAnswer = this.get("userAnswer");

    if (userAnswer) {
      userAnswer.forEach(function(answerId){
        let selector = `li.answer[data-id='${answerId}']`;
        let $answer = Ember.$(selector);
        $answer.toggleClass('selected');
      });
    }
  },
  /**
   * Set answers
   */
  setAnswers: function(){
    let userAnswer = this.get("userAnswer");
    this.set('selectedAnswers', userAnswer ? userAnswer : []);
  },
});
