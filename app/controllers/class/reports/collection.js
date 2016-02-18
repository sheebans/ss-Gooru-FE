import Ember from "ember";

/**
 *
 * Controls the access to the analytics data for a
 * class related to a collection of resources
 *
 */

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('class'),

  realTimeService: Ember.inject.service('api-sdk/real-time'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    setAnonymous: function () {
      this.set("anonymous", !this.get("anonymous"));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Collection} assessment
   */
  assessment: null,

  /**
   * @property {User[]} students
   */
  students: Ember.A([]),

  /**
   * @prop { UserResourcesResult[] } userResults - Content feed to update the report data
   */
  userResults: null,

  /**
   * @property {boolean}
   */
  anonymous: false,

  /**
   * @property {ReportData} report data
   */
  reportData: null,


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
/*
  init: function() {
    const controller = this;
    this.get('realTimeService').findResourcesByCollection('class-id-1', 'collection-id-1')
      .then(function(results) {
        controller.get('reportData').merge(results);
      });
  }*/

});
