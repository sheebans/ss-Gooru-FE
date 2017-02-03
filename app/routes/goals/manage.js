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
  // Methods

  /**
   * Set all controller properties used in the template
   * @param controller
   */
  setupController: function(controller) {
    let route = this;
    let userId = route.get("session.userId");

    controller.get('goalService').getGoalsByUser(userId).then(function (goals) {
      controller.set("goals", goals);
    });
    controller.resetProperties();

  }

});
