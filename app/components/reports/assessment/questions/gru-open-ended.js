import Ember from "ember";

/**
 * Open Ended Question
 *
 * Component responsible for controlling the logic and appearance of an open
 * ended question inside of the assessment report
 *
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-open-ended'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} the user answer, "N/A" is the default.
   */
  answer: "N/A"

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

});
