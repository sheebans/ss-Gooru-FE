import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  classService: Ember.inject.service("api-sdk/class"),

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
      const url = `${basePath}/api/nucleus-download-reports/v1/class/${classId}/course/${courseId}/download/file`;
      Ember.$("#download_iframe").attr("src", url);
    },

    requestReport: function (aClass) {
      const classId = aClass.get("id");
      const courseId = aClass.get("courseId");
      this.get("classService").requestClassReport(classId, courseId).then(function(status){
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
