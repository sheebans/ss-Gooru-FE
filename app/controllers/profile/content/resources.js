import Ember from 'ember';
import {DEFAULT_PAGE_SIZE} from 'gooru-web/config/config';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {
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
   * @property {Collection[]} resources
   */
  resources: null,

  /**
   * @property {boolean} isMyProfile
   */
  isMyProfile: Ember.computed.alias("profileController.isMyProfile"),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias("profileController.profile"),

  /**
   * Current user id
   */
  currentUserId: Ember.computed.alias("profileController.currentUserId"),

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
  showMoreResultsButton: Ember.computed("resources.[]", function(){
    return this.get("resources.length") &&
      (this.get("resources.length") % this.get("pagination.pageSize") === 0);
  }),

  // Methods
  showMoreResults: function(){
    const controller = this;
    const profile = this.get("profile");
    const pagination = this.get("pagination");
    pagination.page = pagination.page + 1;

    controller.get('profileService')
      .readResources(profile.get("id"), pagination)
      .then(function(resources){
        controller.get("resources").pushObjects(resources.toArray());
      });
  },

  resetValues: function(){
    this.set("pagination", {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    })
  }



});
