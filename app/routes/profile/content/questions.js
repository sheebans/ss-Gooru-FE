import Ember from 'ember';

export default Ember.Route.extend({
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
     * On card edit question button click
     * @param {Question} question
     */
    editQuestion: function (question) {
      this.transitionTo("content.questions.edit", question.get("id"));
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function (){
    const profile = this.modelFor("profile").profile;
    return this.get("profileService").readQuestions(profile.get("id"));
  },

  setupController: function (controller , model) {
    console.log(model[0].get('type'));
    controller.set("questions", model);
  }


});
