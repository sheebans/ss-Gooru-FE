import Ember from 'ember';
import AccordionMixin from '../../mixins/gru-accordion';

export default Ember.Component.extend(AccordionMixin, {
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

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
    component.set('currentClass', component.get('model'));
    component
      .get('courseMapService')
      .getCourseInfo(classId, courseId)
      .then(function(course) {
        component.set('items', course.get('children'));
        component.set('isLoading', false);
      });
  },

  // -------------------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * @function goLive
     */
    goLive: function(collectionId) {
      this.sendAction('onGoLive', collectionId);
    },

    /**
     * Launch an assessment on-air
     *
     * @function actions:launchOnAir
     */
    launchOnAir: function(collectionId) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onLaunchOnAir', collectionId);
    },

    /**
     * @function actions:selectItem
     * @param {string} collection - collection or assessment
     * @see module:app/components/class/overview/gru-accordion-lesson
     */
    selectResource: function(unitId, lessonId, collection) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onSelectResource', unitId, lessonId, collection);
    },

    /**
     * @function studyNow
     * @param {string} type - collection or assessment
     * @param {string} lessonId - lesson id
     * @param {string} unitId - lesson id
     * @param {string} item - collection, assessment, lesson or resource
     * @see components/class/overview/gru-accordion-lesson
     */
    studyNow: function(type, unitId, lessonId, item) {
      this.sendAction('onStudyNow', type, unitId, lessonId, item);
    },
    /**
     * Trigger the 'onLocationUpdate' event handler
     *
     * @function actions:updateLocation
     * @param {string} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     */
    updateLocation: function(newLocation) {
      if (this.get('onLocationUpdate')) {
        this.get('onLocationUpdate')(newLocation);
      }
    },
    /**
     * Trigger action to update content visibility list
     */
    updateContentVisibility: function(contentId, visible) {
      this.sendAction('onUpdateContentVisibility', contentId, visible);
    }
  }
});
