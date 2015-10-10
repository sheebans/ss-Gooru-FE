import Ember from "ember";

/**
 * @typedef {object} Index Route
 */
export default Ember.Route.extend({

  /**
   * @property {SubjectService} Service to retrieve subjects
   */
  subjectService: Ember.inject.service("api-sdk/subject"),

  /**
   * @property {GradeService} Service to retrieve grades
   */
  gradeService: Ember.inject.service("api-sdk/grade"),

  model: function() {
    var subjects = this.get("subjectService").readAll();
    var grades = this.get("gradeService").readAll();

    return Ember.RSVP.hash({
      subjects: subjects,
      grades: grades
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
    controller.set("grades", model.grades);

  }


});
