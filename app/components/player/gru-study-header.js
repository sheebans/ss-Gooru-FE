import Ember from 'ember';
import { ANONYMOUS_COLOR } from 'gooru-web/config/config';

/**
 * Study Player header
 *
 * Component responsible for showing an informative header for the study player.
 * It may embed other components for interacting with the player.
 *
 * @module
 * @see controllers/study-player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-study-header'],
  classNameBindings: ['toggleState:expanded:collapsed', 'showConfirmation:hidden'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    toggleHeader() {
      this.toggleProperty('toggleState');
      this.sendAction("onToggleHeader", this.get('toggleState'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} color - Hex color value for the bar in the bar chart
   */
  color: ANONYMOUS_COLOR,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   * @property {Number} barChartData
   */
  barChartData: Ember.computed('collection', function () {
    return [
      {
        color: this.get('color'),
        percentage: 10
      }
    ];
  })

  // -------------------------------------------------------------------------
  // Methods

});
