import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    showClasses: function (type) {
      this.set("showActiveClasses", type === "active");
      this.set("showArchivedClasses", type === "archived");
    },

    downloadReport: function (aClass) {
      const classId = aClass.get("id");
      const courseId = aClass.get("courseId");
      const basePath = `${window.location.protocol}//${window.location.host}`;
      const userId = this.get("session.userId");
      const sessionToken = encodeURIComponent(this.get('session.token-api3'));
      const url = `${basePath}/api/nucleus-download-reports/v1/class/${classId}/course/${courseId}/download/file?sessionToken=${sessionToken}&userId=${userId}`;
      Ember.$("#download_iframe").attr("src", url);
    },

    requestReport: function (aClass) {
      const classId = aClass.get("id");
      const courseId = aClass.get("courseId");
      const userId = this.get("session.userId");
      this.get("classService").requestClassReport(classId, courseId, userId).then(function(status){
        aClass.set("reportStatus", status);
      });
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
   * @property {Class[]}
   */
  activeClasses: Ember.computed.filterBy("myClasses.classes", "isArchived", false),

  /**
   * @property {Class[]}
   */
  archivedClasses: Ember.computed.filterBy("myClasses.classes", "isArchived", true),


  /**
   * @property {Number} Total of joined classes
   */
  totalJoinedClasses: Ember.computed('myClasses', function() {
    return this.get('myClasses.memberList').length;
  }),

  /**
   * @property {Number} Total of teaching classes
   */
  totalTeachingClasses: Ember.computed('myClasses', function() {
    return this.get('myClasses.ownerList').length + this.get('myClasses.collaboratorList').length;
  })
});
