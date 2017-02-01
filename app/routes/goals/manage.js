import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Manage Goals route
 *
 * @module
 * @augments Ember.Route
 */

export default Ember.Route.extend(PrivateRouteMixin, {

// -------------------------------------------------------------------------
  // Properties



  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties used in the template
   * @param controller
   */
  setupController: function(controller) {
    controller.resetProperties();
  },


});
