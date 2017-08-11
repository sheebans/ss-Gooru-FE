import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {rubricService}
   */
  rubricService: Ember.inject.service('api-sdk/rubric'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-add-rubric-to-question'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Select rubric
     */
    selectRubric: function(rubric) {
      this.set('selectedRubric', rubric);
      $('.gru-add-rubric-to-question .selected').removeClass('selected');
      $(`.${rubric.id}`).addClass('selected');
    },

    /**
     * Add to question
     */
    addTo: function() {
      //let component = this;
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Model with the values to use in the modal
   */
  model: null,

  /**
   * Question id of question to add the rubric
   */
  questionId: null
});
