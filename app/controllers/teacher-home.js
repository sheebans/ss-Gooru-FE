import Ember from 'ember';
import Env from 'gooru-web/config/environment';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showClasses: function (type) {
      this.set("showActiveClasses", type === "active");
      this.set("showArchivedClasses", type === "archived");
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates when then active classes are visible
   * @property {boolean}
   */
  showActiveClasses: true,

  /**
   * Indicates when then archived classes are visible
   * @property {boolean}
   */
  showArchivedClasses: false,

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
   * @property {Class[]}
   */
  archivedClasses: Ember.computed.filterBy("myClasses.classes", "isArchived", true),

  /**
   * @property {Number} Total of teaching classes
   */
  totalTeachingClasses: Ember.computed.alias("activeClasses.length"),

  /**
   * @property {boolean} Indicates if there are classes
   */
  hasClasses: Ember.computed.bool("totalTeachingClasses"),

  /**
   * Toolkit site url
   * @property {string}
   */
  toolkitSiteUrl: Ember.computed(function(){
    return Env.toolkitSiteUrl;
  }),

  /**
   * @property {Class[]} Active classes for announcements
   */
  announcementsClasses:Ember.computed('activeClasses',function(){
    return this.get('activeClasses').slice(0,5);
  }),

  /**
   * @property {Boolean} Indicate if has more announcements to show
   */
  hasMoreAnnouncementes:Ember.computed('activeClasses','announcementsClasses',function(){
    return this.get('activeClasses').length > this.get('announcementsClasses').length;
  })

// -------------------------------------------------------------------------
// Methods

});
