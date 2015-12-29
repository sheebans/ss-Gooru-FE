import Ember from 'ember';

export default Ember.Component.extend({
  performanceService: Ember.inject.service("api-sdk/performance"),
  tagName: 'div',
  classNames:['gru-unit-performance-container', 'panel'],
  selectedOption: null,
  lessons:null,
  visibleLessons:null,
  index:'',
  setUnitBreadcrumb:null,
  actions: {
    /**
     * Load the data for this unit (data should only be loaded once) and trigger
     * the 'onLocationUpdate' event handler with the unit information
     *
     * @function actions:selectUnit
     */
    selectUnit: function (unit) {
      const component = this;
      component.loadData(unit.get('id'));
      console.debug("A"); //remove this
      let element =$('#'+ component.get('elementId')) ;
      if(element.hasClass('selected')){
        element.removeClass('selected');
        //component.get('setUnitBreadcrumb')();
      }
      else{
        $('.gru-unit-performance-container.selected').removeClass('selected');
        component.get('setUnitBreadcrumb')(unit, component.get('index'));
        element.addClass('selected');
      }
    }
  },
  // -------------------------------------------------------------------------
  // Events

  mouseDown: function(event) {
    event.stopPropagation();
    $("#lesson-header-"+(this.index+1))[0].click();
  },
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
      let temp = this.get('lessons').get('content');
      this.set('visibleLessons',this.get('lessons').get('content'));
    }
  })
});
