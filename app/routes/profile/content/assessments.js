import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Route.extend(ModalMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * On card edit assessment button click
     * @param {Assessment} assessment
     */
    editAssessment: function (assessment) {
      this.transitionTo("content.assessments.edit", assessment.get("id"),{queryParams: {courseId: assessment.get('courseId'),allowBackToCourse:false}});
    },

    /**
     * On card remix assessment button click
     * @param {Assessment} assessment
     */
    remixAssessment: function (assessment) {
      var remixModel = {
        content: assessment
      };
      this.send('showModal', "content.modals.gru-assessment-remix", remixModel);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function (){
    const profile = this.modelFor("profile").profile;
    return this.get("profileService").readAssessments(profile.get("id"));
  },

  setupController: function (controller , model) {
    controller.set("assessments", model);
  },

  deactivate: function() {
    this.get("controller").resetValues();
  }



});
