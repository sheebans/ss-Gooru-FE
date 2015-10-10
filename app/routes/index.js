import Ember from "ember";

/**
 * @typedef {object} Index Route
 */
export default Ember.Route.extend({

  /**
   * @property {SubjectService} Service to retrive subjects
   */
  subjectService: Ember.inject.service("api-sdk/subject"),

  model: function() {
    var subjects = this.get("subjectService").readAll();

    return Ember.RSVP.hash({
      subjects: subjects
    });
  },

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    this._super(controller, model);
    // @TODO We are filtering by library == "library value, we need to verify if this is the correct filter value.
    controller.set("subjects", model.subjects.filterBy("library", "library"));
  }


});
