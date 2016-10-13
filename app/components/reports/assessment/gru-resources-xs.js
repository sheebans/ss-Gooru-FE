import Ember from 'ember';

/**
 *Question-xs
 *
 * Component responsible for showing the question details for xsmall devices.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-resources-xs'],
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Resource to be displayed by the component
   *
   * @property {Ember.Object}
   */
  resource: null

});
