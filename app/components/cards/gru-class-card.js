import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies
    /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service("api-sdk/course"),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards gru-class-card col-xs-12 col-md-6'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    downloadReport: function(){
      this.sendAction("onDownloadReport", this.get("class"));
    },

    requestReport: function(){
      this.sendAction("onRequestReport", this.get("class"));
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init: function() {
    this._super(...arguments);
    const courseId = this.get('class.courseId');
    if (this.get('showUnitsCount') && courseId) {      
      this.get('courseService').fetchById(courseId).then(function(course){
        this.set('unitsCount', course.get('unitCount'));
      }.bind(this));
    }  
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {Object} Object containing student count by class
   */
  classStudentCount: null,

  /**
   * @property {Boolean} Indicates if units count is displayed
   */
  showUnitsCount: false,

  /**
   * @property {Number} Count of class units
   */
  unitsCount: 0,

  /**
   * @property {Profile}
   */
  profile: null,

  /**
   * @property {Number} Count of collaborators in the class
   */
  collaboratorsCount: Ember.computed('class.collaborators', function() {
    const collaborators = this.get('class.collaborators');
    return (collaborators && collaborators.length > 1) ? collaborators.length - 1 : 0;
  }),

  /**
   * @property {Number} Count of students in the class
   */
  studentCount: Ember.computed('class.id', 'classStudentCount', function() {
    let classStudentCount = this.get('classStudentCount');
    return (classStudentCount && Ember.keys(classStudentCount).length) ?
        (classStudentCount[this.get('class.id')] ? classStudentCount[this.get('class.id')] : 0) :
        0;
  })
});
