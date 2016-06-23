import Ember from "ember";
import PublicRouteMixin from "gooru-web/mixins/public-route-mixin";

export default Ember.Route.extend(PublicRouteMixin, {

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller) {
    controller.resetProperties();
  }

});
