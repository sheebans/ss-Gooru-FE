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

  /**
   * @property {StandardService} Service to retrieve standards
   */
  standardService: Ember.inject.service("api-sdk/standard"),

  profileService: Ember.inject.service("api-sdk/profile"),

  model: function() {
    var subjects = this.get("subjectService").readAll();
    var grades = this.get("gradeService").readAll();
    var standards = this.get("standardService").readAll();
    //var profile = this.get("profileService").findByCurrentUser();

    return Ember.RSVP.hash({
      subjects: subjects,
      grades: grades,
      standards: standards,
      //profile: profile
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

    //if (!this.get("isAnonymous")) {
    //  var codes = model.profile.get("user").get("metadata").get("taxonomyPreference").get("code");
    //  this.checkStandards(model.standards, codes);
    //}

    controller.set("standards", model.standards);
  },

  checkStandards: function(standards, codes) {
    var checkableStandards = this.get("standardService").getCheckableStandards();
    standards.forEach(function(standard) {
      if (checkableStandards.contains(standard.get("id"))) {
        standard.set("disabled", !codes.contains(standard.get("id")));
      }
    });
  }

});
