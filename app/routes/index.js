import Ember from 'ember';
import { checkStandards } from '../utils/utils';

/**
 * @typedef {object} Index Route
 */
export default Ember.Route.extend({

  /**
   * @property {Ember.Service} Service to retrieve subjects
   */
  subjectService: Ember.inject.service("api-sdk/subject"),

  /**
   * @property {Ember.Service} Service to retrieve grades
   */
  gradeService: Ember.inject.service("api-sdk/grade"),

  /**
   * @property {Ember.Service} Service to retrieve standards
   */
  standardService: Ember.inject.service("api-sdk/standard"),

  /**
   * @property {Ember.Service} Service to retrieve profiles
   */
  profileService: Ember.inject.service("api-sdk/profile"),

  model: function() {
    var subjects = this.get("subjectService").readAll();
    var grades = this.get("gradeService").readAll();
    var standards = this.get("standardService").readAll();
    var profile = this.get("profileService").findByCurrentUser();

    return Ember.RSVP.hash({
      subjects: subjects,
      grades: grades,
      standards: standards,
      profile: profile
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

    if (model.profile) {
      var checkableStandards = this.get("standardService").getCheckableStandards();
      var codes = model.profile.get("user").get("metadata").get("taxonomyPreference").get("code");
      checkStandards(model.standards, checkableStandards, codes);
    }

    controller.set("standards", model.standards);
  }
});
