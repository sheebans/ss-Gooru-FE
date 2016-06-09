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
      const sessionToken = this.get('session.token-api3');
      const url = `${basePath}/api/nucleus-download-reports/v1/class/${classId}/course/${courseId}/download/file?sessionToken=${sessionToken}`;
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
  totalJoinedClasses: Ember.computed('myClasses.memberList', function() {

    return this.getActiveClasses(this.get('myClasses.memberList'));
  }),

  /**
   * @property {Number} Total of teaching classes
   */
  totalTeachingClasses: Ember.computed('myClasses', function() {
    return this.getActiveClasses(this.get('myClasses.ownerList')) + this.getActiveClasses(this.get('myClasses.collaboratorList'));
  }),


// -------------------------------------------------------------------------
// Methods

  /**
   * Return the number of active classes on specific list
   */
  getActiveClasses:function(list){
    var component = this;
    var totalActiveClasses = Ember.A();
    list.forEach(function(item){
      let activeItem = component.get('activeClasses').findBy('id',item);
      if(activeItem){
        totalActiveClasses.addObject(activeItem);
      }
    });

    return totalActiveClasses.length;
  }
});


