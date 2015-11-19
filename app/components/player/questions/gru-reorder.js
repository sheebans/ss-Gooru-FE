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
  initSortableList: function() {
    const component = this;
    const sortable = this.$('.sortable');

    sortable.sortable();

    // Manually add subscriptions to sortable element -makes it easier to test
    sortable.on('sortupdate', function() {

      const $items = component.$('.sortable').find('li');
      const answers = $items.map(function(idx, item) {
        return $(item).data('id');
      }).toArray();

      component.notifyAnswerChanged(answers);
      component.notifyAnswerCompleted(answers);
    });

  }.on('didInsertElement'),

  removeSubscriptions: function() {
    this.$('.sortable').off('sortupdate');
  }.on('willDestroy')

  // -------------------------------------------------------------------------
  // Properties


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
