import Ember from 'ember';
import AccordionMixin from '../../mixins/gru-accordion';
import { getBarGradeColor } from 'gooru-web/utils/utils';

export default Ember.Component.extend(AccordionMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['class', 'gru-learner-pathway'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  isLoading: false,

  /**
   * calculate  the class average score as a width
   * @property {string}
   */
  classAverage: Ember.computed('classPerformance', function() {
    let component = this;
    let score = component.get('classPerformance.score');
    return Ember.String.htmlSafe(`width: ${score}%;`);
  }),

  /**
   * calculate  the class average by student performance score as a width
   * @property {string}
   */
  studentAverage: Ember.computed('studentPerformance', function() {
    let component = this;
    let score = component.get('studentPerformance.score');
    return Ember.String.htmlSafe(`width: ${score}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  studentColorStyle: Ember.computed('studentPerformance', function() {
    let score = this.get('studentPerformance.score');
    this.set('studentColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),
  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  classColorStyle: Ember.computed('classPerformance', function() {
    let score = this.get('classPerformance.score');
    this.set('classColor', getBarGradeColor(score));
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  item: Ember.computed(function() {
    return this.get('model');
  }),

  // -------------------------------------------------------------------------
  // Events

  init() {
    let component = this;
    component._super(...arguments);
    component.set('isLoading', true);
    let classId = component.get('model.classId');
    let courseId = component.get('model.courseId');
    let studentId = component.get('model.userId');
    component.set('currentClass', component.get('model'));
    const coursePromise = component
      .get('courseMapService')
      .getCourseInfo(classId, courseId);

    const classPerfomance = component
      .get('performanceService')
      .findClassPerformanceSummaryByClassIds([classId]);

    const studentProfile = component
      .get('profileService')
      .readUserProfile(studentId);

    const performanceSummaryPromise = component
      .get('performanceService')
      .findClassPerformanceSummaryByStudentAndClassIds(studentId, [classId]);

    return Ember.RSVP.hash({
      classPerfomance: classPerfomance,
      course: coursePromise,
      classPerformanceSummaryItems: performanceSummaryPromise,
      profile: studentProfile
    }).then(function(hash) {
      let course = hash.course;
      component.set('items', course.get('children'));
      component.set('classPerformance', hash.classPerfomance[0]);
      component.set('studentPerformance', hash.classPerformanceSummaryItems[0]);
      component.set('course', hash.course);
      component.set('profile', hash.profile);
      component.set('isLoading', false);
    });
  },

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * @function actions:selectItem
     * @param {string} collection - collection or assessment
     * @see module:app/components/class/overview/gru-accordion-lesson
     */
    selectResource: function(unitId, lessonId, collection) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onSelectResource', unitId, lessonId, collection);
    },

    close() {
      let component = this;
      component.triggerAction({
        action: 'closeModal'
      });
    }
  }
});
