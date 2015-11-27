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


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-hs-text'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events
  setupSubscriptions: Ember.on('didInsertElement', function() {
    const component = this;

    this.$('li.answer').on('click', function() {
      const $this = $(this);
      const answerId = $this.data('id');

      var selected = component.get('selectedAnswers');
      var idx = selected.indexOf(answerId);

      $this.toggleClass('selected');

      if (idx === -1) {
        selected.push(answerId);
        component.notifyAnswerChanged(selected);
        component.notifyAnswerCompleted(selected);
      } else {
        selected.splice(idx, 1);
        if (!selected.length) {
          component.notifyAnswerCleared(selected);
        }
      }
    });
  }),

  removeSubscriptions: Ember.on('willDestroy', function() {
    this.$('li.answer').off('click');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /*
   * @prop {Array} selectedAnswers - Array of ids for each one of the answers selected by the user
   */
  selectedAnswers: [],

  /*
   * @prop {String} instructions - Question instructions
   */
  instructions: Ember.computed(function() {
    return this.get('i18n').t('gru-hs-text.instructions')
  }),

  /*
   * @typedef answers
   * @prop {String} id - answer id
   * @prop {String} content - markup string containing the answer text
   */
  answers: Ember.computed.map('question.answers', function(answer) {
    return {
      id: answer.get('id'),
      content: answer.get('text')
    }
  })

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
