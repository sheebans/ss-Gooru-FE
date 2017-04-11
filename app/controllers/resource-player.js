import Ember from 'ember';

/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default Ember.Controller.extend({

  queryParams: ['collectionUrl'],

  actions: {
    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader: function (toggleState) {
      this.set('toggleState', toggleState);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true

});
