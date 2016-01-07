import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  performanceService: Ember.inject.service("api-sdk/performance"),
  // -------------------------------------------------------------------------
  // Attributes
  classNames:['gru-unit-performance-container', 'panel'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Load the data for this unit and trigger
     * the 'onLocationUpdate' event handler with the unit information
     *
     * @function actions:selectUnit
     */
    selectUnit: function (unit) {
      const component = this;
      component.loadData(unit.get('id'));
      let element =$('#'+ component.get('elementId')) ;
      if(element.hasClass('selected')){
        element.removeClass('selected');
      }
      else{
        $('.gru-unit-performance-container.selected').removeClass('selected');
        element.addClass('selected');
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Selected option to show when on extra small
   *
   * @property {String}
   */
  selectedOption: null,
  /**
   * Promise that will resolve the visible lessons for this unit
   *
   * @property {Ember.Promise}
   */
  lessonsPromise:null,
  /**
   * Collection that contains the lesson performance models for this unit
   *
   * @property {Ember.Array}
   */
  lessons:null,
  /**
   * Number of the index of this unit
   *
   * @property {Number}
   */
  index:null,
  /**
   * Model of the class this unit belongs to
   *
   * @property {Class}
   */
  classModel:null,
  /**
   * UserID this user belongs to
   *
   * @property {String}
   */
  userId:'',
  /**
   * Performance model for the unit
   *
   * @property {performance/performance}
   */
  performance:null,

  /**
   * @prop {Boolean}
   * Property that determines whether we are waiting for a promise to get fulfilled.
   */
  isLoading: Ember.computed('lessonsPromise', function() {
    return this.get('lessonsPromise') !==null && !this.get('lessonsPromise.isFulfilled');
  }),
  // -------------------------------------------------------------------------

  // Methods

  /**
   * Load data for the unit
   * @function actions:loadData
   * @returns {undefined}
   */
  loadData: function (unitId) {
    // Loading of data will only happen if the promise for the 'lessons' has not previously been set
    if (!this.get('lessonsPromise')) {
      var lessonsPromise = this.getLessons(unitId);
      this.set('lessonsPromise', lessonsPromise);
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
    return this.get("performanceService").findLessonPerformanceByClassAndCourseAndUnit(this.get('userId'), this.get('classModel').id, this.get('classModel').course, unitId);
  },

  /**
   * Observe when the 'lessons' promise has resolved and proceed to add the
   * corresponding users information (coming from a separate service) to each
   * one of the lessons so they are resolved in one single loop in the template.
   */
  addLessonsToUnit: Ember.observer('lessonsPromise.isFulfilled', function() {
    if (this.get('lessonsPromise.isFulfilled')) {
      this.set('lessons',this.get('lessonsPromise').get('content'));
    }
  })

});
