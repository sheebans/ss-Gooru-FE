import Ember from 'ember';
import SessionMixin from '../mixins/session';

/**
 * Classes route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(SessionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {Ember.Service} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function() {
    var classesJoined = this.get("classService").findClassesIJoined();
    var classesTaught = this.get("classService").findClassesITeach();

    return Ember.RSVP.hash({
      classesJoined: classesJoined,
      classesTaught: classesTaught
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("classesJoined", model.classesJoined);
    controller.set("classesTaught", model.classesTaught);
  }

});
