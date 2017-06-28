import Ember from 'ember';

/**
 * Library card
 *
 * Component responsible of showing the library information in cards, so that most useful information is summarized there.
 * @module
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-partner-library-card'],

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
  },

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Library} content
   */
  content: null


  // -------------------------------------------------------------------------
  // Methods


});
