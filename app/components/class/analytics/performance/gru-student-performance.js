import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  performanceService: Ember.inject.service("api-sdk/performance"),
  // -------------------------------------------------------------------------
  // Attributes
  tagName: 'ul',
  classNames:['gru-performance-container'],
  selectedOption: null,
  performances:null,
  lessons:null,
  visibleLessons:Ember.computed.filterBy('lessons.content', 'visibility', true),
  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Load the data for this unit (data should only be loaded once) and trigger
     * the 'onLocationUpdate' event handler with the unit information
     *
     * @function actions:selectUnit
     */
    selectUnit: function (unitId) {
      this.loadData(unitId);
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load data for the unit
   *
   * @function actions:loadData
   * @returns {undefined}
   */
  loadData: function (unitId) {
    // Loading of data will only happen if 'items' has not previously been set
    if (!this.get('lessons')) {
      var lessonsPromise = this.getLessons(unitId);
      this.set('lessons', lessonsPromise);

      // TODO: getUnitUsers is currently dependent on items that's why this declaration
      // takes place after setting items. Once api-sdk/course-location is complete
      // both declarations can be put together, as they should
      //var usersLocation = this.getUnitUsers();
      //this.set('usersLocation', usersLocation);
    }
  },

  /**
   * Get all the lessons for the unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getLessons: function(unitId) {
    const controller = this.get('targetObject');
    return this.get("performanceService").findLessonPerformanceByClassAndCourseAndUnit(controller.userId, controller.classId, controller.courseId, unitId);

  },

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observe when the 'items' promise has resolved and proceed to add the
   * corresponding users information (coming from a separate service) to each
   * one of the items so they are resolved in one single loop in the template.
   */
  addLessonsToUnit: Ember.observer('lessons.isFulfilled', function() {
    if (this.get('lessons.isFulfilled')) {
      let visibleLessons = this.get('lessons').get('content');
      console.log(visibleLessons[0]);

    }
  })
});
