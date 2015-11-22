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
  selectedAnswers: []

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
