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
      Ember.Logger.debug(aClass.get("id"));
      const classId = aClass.get("id");
      const courseId = aClass.get("courseId");
      const url = `/api/nucleus-download-reports/v1/class/${classId}/course/${courseId}/download/file`;
      console.debug(url);
    },

    requestReport: function (aClass) {
      const classId = aClass.get("id");
      const courseId = aClass.get("courseId");
      this.get("classService").requestClassReport(classId, courseId);
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
