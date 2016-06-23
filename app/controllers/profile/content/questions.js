import Ember from 'ember';
import {DEFAULT_PAGE_SIZE} from 'gooru-web/config/config';

export default Ember.Controller.extend({



  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showMoreResults: function(){
      this.showMoreResults();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Collection[]} questions
   */
  questions: null,

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
  showMoreResultsButton: Ember.computed("questions.[]", function(){
    return this.get("questions.length") &&
      (this.get("questions.length") % this.get("pagination.pageSize") === 0);
  }),

    // Methods
  showMoreResults: function(){
    const controller = this;
    const profile = this.get("profile");
    const pagination = this.get("pagination");
    pagination.page = pagination.page + 1;

    controller.get('profileService')
      .readQuestions(profile.get("id"), pagination)
      .then(function(questions){
        controller.get("questions").pushObjects(questions.toArray());
      });
  },

  resetValues: function(){
    this.set("pagination", {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    });
  }

});
