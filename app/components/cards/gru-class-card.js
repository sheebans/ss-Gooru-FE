import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards gru-class-card '],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {course} course information
   */
  course: null,

  /**
   * @property {Object} Object containing student count by class
   */
  classStudentCount: null,

  /**
   * @property {Boolean} Indicates if units count is displayed
   */
  showUnitsCount: false,

  /**
   * @property {Profile}
   */
  profile: null,

  /**
   * @property {boolean} Indicates if the class path
   */
  classPath: Ember.computed('profile', function() {
    return this.get('profile').get('role') === 'student'
      ? 'student.class'
      : 'class.overview';
  }),

  /**
   * @property {Number} Count of collaborators in the class
   */
  collaboratorsCount: Ember.computed('class.collaborators', function() {
    const collaborators = this.get('class.collaborators');
    return collaborators && collaborators.length > 1
      ? collaborators.length - 1
      : 0;
  }),

  /**
   * @property {Number} Count of students in the class
   */
  studentCount: Ember.computed('class.id', 'classStudentCount', function() {
    let classStudentCount = this.get('classStudentCount');
    return classStudentCount && Ember.keys(classStudentCount).length
      ? classStudentCount[this.get('class.id')]
        ? classStudentCount[this.get('class.id')]
        : 0
      : 0;
  }),

  /**
   * @property {Class} class information
   */
  archivedClasses: Ember.computed('activeClasses', function() {
    'applicationController.myClasses.classes.[]',
    function() {
      return this.get(
        'applicationController.myClasses'
      ).getTeacherArchivedClasses();
    };
  }),

  /**
   * @property {Number} score percentage
   * Computed property for performance score percentage
   */
  scorePercentage: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage >= 0 && scorePercentage !== null
      ? `${scorePercentage}%`
      : '_';
  }),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item) {
      const classId = this.get('class.id');
      if (this.get('onItemSelected')) {
        this.sendAction('onItemSelected', item, classId);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    const component = this;
    component._super(...arguments);
  }
});
