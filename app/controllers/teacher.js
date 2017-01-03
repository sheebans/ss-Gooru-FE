import Ember from 'ember';
import Env from 'gooru-web/config/environment';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions



  // -------------------------------------------------------------------------
  // Properties

  /**
   * A link to the parent application controller
   * @see controllers/application.js
   * @property {ClassesModel}
   */
  myClasses: Ember.computed.alias('applicationController.myClasses'),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * @property {Class[]}
   */
  activeClasses: Ember.computed("myClasses.classes", function () {
    const profile = this.get("profile");
    return this.get("myClasses.classes").filter(function(aClass){
      return !aClass.get("isArchived") && aClass.isTeacher(profile.get("id"));
    });
  }),

  /**
   * @property {Number} Total of teaching classes
   */
  totalTeachingClasses: Ember.computed.alias("activeClasses.length"),

  hasClasses: Ember.computed.bool("totalTeachingClasses"),

  /**
   * Toolkit site url
   * @property {string}
   */
  toolkitSiteUrl: Ember.computed(function(){
    return Env.toolkitSiteUrl;
  })

// -------------------------------------------------------------------------
// Methods

});
