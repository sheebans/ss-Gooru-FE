import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  tagName: '',

  classNames: ['gru-metrics-performance-information'],

  // -------------------------------------------------------------------------
  // Actions
  actions:{

  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  selectedOptions: Ember.A(["score"]),

  // -------------------------------------------------------------------------

  // Methods

});
