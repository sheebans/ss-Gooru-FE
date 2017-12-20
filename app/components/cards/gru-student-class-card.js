import Ember from 'ember';
import { getBarGradeColor } from 'gooru-web/utils/utils';

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
    },

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

    const courseId = component.get('class.courseId');
    if (courseId) {
      component
        .get('courseService')
        .fetchByIdWithOutProfile(courseId)
        .then(function(course) {
          if (!component.isDestroyed) {
            component.set('course', course);
          }
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
   * @property {boolean} Show or not the current location
   */
  showCurrentLocation: Ember.computed('class.currentLocation', function() {
    return (
      this.get('class.currentLocation') &&
      this.get('class.currentLocation.status') === 'in-progress' &&
      this.get('class.currentLocation.course') &&
      this.get('class.currentLocation.unit') &&
      this.get('class.currentLocation.lesson') &&
      this.get('class.currentLocation.collection')
    );
  }),

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
  barChartData: Ember.computed(
    'class.performanceSummary',
    'class.performanceSummary.score',
    function() {
      let score = this.get('class.performanceSummary.score');
      let scoreColor = getBarGradeColor(score);
      const completed = this.get('class.performanceSummary.totalCompleted');
      const total = this.get('class.performanceSummary.total');
      const percentage = completed ? completed / total * 100 : 0;
      return [
        {
          color: scoreColor,
          percentage
        }
      ];
    }
  ),

  /**
   * @property {String} current location title
   * Computed property for current Location Title
   */
  currentLocationTitle: Ember.computed('class.currentLocation', function() {
    const currentLocation = this.get('class.currentLocation');
    return currentLocation
      ? `${currentLocation.get('collection.title')},
      ${
  this.get('i18n').t('student-landing.class.unit').string
} ${currentLocation.get('unitIndex') + 1},
      ${
  this.get('i18n').t('student-landing.class.lesson').string
} ${currentLocation.get('lessonIndex') + 1}`
      : '';
  })
});
