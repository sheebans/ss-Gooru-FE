import Ember from 'ember';
import {DEFAULT_PAGE_SIZE} from 'gooru-web/config/config';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    openContentPlayer: function(assessmentId) {
      this.transitionToRoute('player', assessmentId);
    },

    showMoreResults: function(){
      this.showMoreResults();
    }

  },

  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Assessment[]} assessments
   */
  assessments: null,

  /**
   * @property {boolean} isMyProfile
   */
  isMyProfile: Ember.computed.alias("profileController.isMyProfile"),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias("profileController.profile"),

  /**
   * @property {*}
   */
  pagination: {
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE
  },

  /**
   * @property {boolean}
   */
  showMoreResultsButton: Ember.computed("assessments.[]", function(){
    return this.get("assessments.length") &&
      (this.get("assessments.length") % this.get("pagination.pageSize") === 0);
  }),

  // Methods
  showMoreResults: function(){
    const controller = this;
    const profile = this.get("profile");
    const pagination = this.get("pagination");
    pagination.page = pagination.page + 1;

    controller.get('profileService')
      .readAssessments(profile.get("id"), pagination)
      .then(function(assessments){
        controller.get("assessments").pushObjects(assessments.toArray());
      });
  },

  resetValues: function(){
    this.set("pagination", {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    })
  }



});
