import Ember from 'ember';
/**
 * Content map controller
 *
 * Controller responsible of the logic for the course map page
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  studentIndependentController: Ember.inject.controller('student.independent'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['location', 'tab'],

  /**.
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: null,

  isFirstLoad: true,

  tab: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Update 'location' (bound query param)
     *
     * @function
     * @param {String} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     * @returns {undefined}
     */
    updateLocation: function(newLocation) {
      this.set('location', newLocation);
    },
    /**
     * Locate the user in is actual location
     *
     * @function
     * @param {String} location'
     * @returns {undefined}
     */
    locateMe: function(location) {
      this.set('location', location);
      this.set('showLocation', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init: function() {
    let controller = this;
    controller._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('[data-toggle="tooltip"]').tooltip();
      let tab = controller.get('tab');
      if (tab && tab === 'report') {
        controller.openStudentCourseReport();
      }
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} userLocation - Location of a user in a course
   * String of the form 'unitId[+lessonId[+resourceId]]'
   */
  userLocation: null,

  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  course: Ember.computed.alias('studentIndependentController.course'),

  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Object}
   */
  performance: Ember.computed.alias('studentIndependentController.performance'),

  /**
   *Show the current location
   */
  showLocation: true,

  openingLocation: Ember.computed('location', function() {
    if (this.get('isFirstLoad')) {
      this.set('isFirstLoad', false);
      var location = this.get('location') || this.get('userLocation');
      this.set('location', location);
      return location;
    } else {
      return this.get('location') || '';
    }
  }),

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

  openStudentCourseReport() {
    let controller = this;
    controller.set('showCourseReport', true);
    let params = Ember.Object.create({
      userId: controller.get('session.userId'),
      courseId: controller.get('course.id'),
      course: controller.get('course'),
      performance: controller.get('performance'),
      isTeacher: false,
      isStudent: true,
      loadUnitsPerformance: false
    });
    controller.set('studentCourseReportContext', params);
  }
});
