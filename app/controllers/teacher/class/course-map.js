import Ember from 'ember';

/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
 */

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['location'],

  /**
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: '',

  isFirstLoad: true,

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Propery to show class id.
   * @property {classId}
   */
  classId: '',

  /**
   * Propery to show course id.
   * @property {courseId}
   */
  courseId: '',

  /**
   * Propery to show unit id.
   * @property {unitId}
   */
  unitId: '',

  /**
   * Propery to show lesson id.
   * @property {lessonId}
   */
  lessonId: '',

  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course} the selected course
   */
  course: null,

  /**
   * A link to the content visibility from class controller
   * @see controllers/class.js
   * @property {Class}
   */
  contentVisibility: Ember.computed.alias('classController.contentVisibility'),

  /**
   * @property {boolean} showWelcome - indicates the toggle welcome panel state, true means open, false means closed
   */
  showWelcome: true,

  /**
   * @property {boolean}
   * Property to find out is owner of the course or not
   */
  isOwner: Ember.computed('course', function() {
    let component = this;
    let loggedInUserId = component.get('session.userId');
    let courseOwnerId = component.get('course.owner.id');
    return loggedInUserId === courseOwnerId;
  }),

  /**
   * @type {Boolean}
   * Property to check whether a class is premium
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user click the lesson level performance score.
     **/
    onOpenLessonReport(lesson, unitId) {
      const component = this;
      const classId = component.get('currentClass.id');
      const lessonId = lesson.id;
      const courseId =
        component.get('currentClass.courseId') ||
        component.get('currentCourse.id');
      component.set('classId', classId);
      component.set('unitId', unitId);
      component.set('lessonId', lessonId);
      component.set('courseId', courseId);
      component.set('selectedLesson', lesson);
      component.set('showLessonReportPullUp', true);
    },

    /**
     * Update 'location' (bound query param)
     *
     * @function
     * @param {String} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     * @returns {undefined}
     */
    updateLocation: function(newLocation) {
      this.set('location', newLocation ? newLocation : null);
    },
    /**
     * Trigger action to update content visibility list
     */
    updateContentVisibility: function(contentId, visible) {
      this.send('updateContentVisible', contentId, visible);
    },

    /**
     * Triggered when a close welcome panel button is selected.
     */
    toggleHeader: function() {
      this.set('showWelcome', false);
    }
  }

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
