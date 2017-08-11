import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-rubric-panel'],

  classNameBindings: ['showFullRubric:full-rubric'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Hide/show full rubric
     */
    showFullRubric: function() {
      this.set('showFullRubric', !this.get('showFullRubric'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Boolean} showFullRubric
   */
  showFullRubric: false
});
