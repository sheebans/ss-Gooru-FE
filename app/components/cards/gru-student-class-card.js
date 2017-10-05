import Ember from 'ember';
import { COMPLETION_CLASS_BAR_COLOR } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-student-class-card'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Opens the study player
     *
     * @function actions:playCollection
     * @param {string} type - collection or assessment
     * @param {string} item - collection, assessment, lesson or resource
     */
    playCollection: function() {
      const component = this;
      const currentLocation = component.get('class.currentLocation');
      this.sendAction('onPlayCollection', currentLocation);
    }
  },
  // -------------------------------------------------------------------------
  // Events

  init: function() {
    const component = this;
    component._super(...arguments);

    const courseId = component.get('class.courseId');
    if (courseId) {
      component
        .get('courseService')
        .fetchById(courseId)
        .then(function(course) {
          component.set('course', course);
        });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {Course} course information
   */
  course: null,

  /**
   * @property {String} color - Hex color value for the default bgd color of the bar chart
   */
  defaultBarColor: COMPLETION_CLASS_BAR_COLOR,

  /**
   * @property {boolean} Show or not the current location
   */
  showCurrentLocation: Ember.computed.and(
    'class.currentLocation',
    'class.currentLocation.course',
    'class.currentLocation.unit',
    'class.currentLocation.lesson',
    'class.currentLocation.collection'
  ),

  /**
   * @property {Number} total
   * Computed property for performance total to add a default value
   */
  total: Ember.computed.alias('class.performanceSummary.total'),

  /**
   * @property {Number} totalCompleted
   * Computed property for performance total completed to add a default value
   */
  totalCompleted: Ember.computed.alias(
    'class.performanceSummary.totalCompleted'
  ),

  /**
   * @property {Number} score percentage
   * Computed property for performance score percentage
   */
  scorePercentage: Ember.computed('class.performanceSummary', function() {
    const scorePercentage = this.get('class.performanceSummary.score');
    return scorePercentage >= 0 && scorePercentage !== null
      ? `${scorePercentage}%`
      : '--';
  }),

  /**
   * @property {Number} completed percentage
   * Computed property for performance completed percentage
   */
  completedPercentage: Ember.computed('class.performanceSummary', function() {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total =
      completed > this.get('class.performanceSummary.total')
        ? completed
        : this.get('class.performanceSummary.total');
    const percentage = completed ? parseInt(completed / total * 100) : 0;

    return this.get('class.performanceSummary') !== null && percentage
      ? `${percentage}% ${this.get('i18n').t('common.completed').string}`
      : this.get('i18n').t('cards.gru-class-card.student.not-started').string;
  }),

  /**
   * @property {[Number]} barChartData
   */
  barChartData: Ember.computed('class.performanceSummary', function() {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total = this.get('class.performanceSummary.total');
    const percentage = completed ? completed / total * 100 : 0;
    return [
      {
        color: this.get('defaultBarColor'),
        percentage
      }
    ];
  }),

  /**
   * @property {String} current location title
   * Computed property for current Location Title
   */
  currentLocationTitle: Ember.computed('class.currentLocation', function() {
    const currentLocation = this.get('class.currentLocation');
    return currentLocation
      ? `${currentLocation.get('collection.title')}, 
      ${this.get('i18n').t('student-landing.class.unit')
    .string} ${currentLocation.get('unitIndex') + 1},
      ${this.get('i18n').t('student-landing.class.lesson')
    .string} ${currentLocation.get('lessonIndex') + 1}`
      : '';
  })
});
