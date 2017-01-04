import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Student route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  analyticsService: Ember.inject.service("api-sdk/analytics"),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties from the model
   * @param controller
   */
  setupController: function(controller) {
    let activeClasses = controller.get('activeClasses');
    let route = this;
    const myId = route.get("session.userId");

    activeClasses.forEach(function (aClass) {
      route.get('analyticsService').getUserCurrentLocation(aClass.get("id"), myId, true).then(function (currentLocation) {
        aClass.set("currentLocation", currentLocation);
      });
    });

  }

});
