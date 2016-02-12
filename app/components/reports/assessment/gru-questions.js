import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Selects Performance Option or not
     * @function actions:selectPerformanceOption
     */
    selectPerformanceOption:function(showPerformance) {
      this.set('showPerformance', showPerformance);
    }
  },
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-questions'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of questions to be displayed by the component
   *
   * @constant {Array}
   */
  results: null,

  /**
   * Indicate if the table show the performance columns
   *
   * @property {Boolean}
   */
  showPerformance: true
});
