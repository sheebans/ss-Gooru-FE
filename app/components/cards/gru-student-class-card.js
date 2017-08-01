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
  showCurrentLocation: Ember.computed('class.currentLocation', function() {
    let currentLocation = this.get('class.currentLocation');
    return (currentLocation && currentLocation.get('course') && currentLocation.get('unit') && currentLocation.get('lesson') && currentLocation.get('collection'));
  })
});
