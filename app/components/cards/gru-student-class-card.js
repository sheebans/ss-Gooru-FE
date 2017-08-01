import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-student-class-card col-xs-12 col-md-6'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {boolean} Show or not the current location
   */
  showCurrentLocation: Ember.computed.and('class.currentLocation','class.currentLocation.course','class.currentLocation.unit','class.currentLocation.lesson','class.currentLocation.collection')

});
