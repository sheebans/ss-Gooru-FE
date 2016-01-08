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
      console.log(this.get('totalLessons.size'));
      if(!this.get('totalLessons').has(unit.get('id'))){
        console.log('entro');
        component.loadLessons(unit.get('id'));
        this.get('totalLessons').set(unit.get('id'),this.get('lessons'));
      }
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
  totalLessons:Ember.Map.create(),
  /**
   * Collection that contains the lesson performance models for this unit
   *
   * @property {Ember.Array}
   */
  lessons:Ember.A(),
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
  isLoading:false,

  // -------------------------------------------------------------------------

  // Methods

  /**
   * Get all the lessons for the unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  loadLessons: function(unitId) {
    const component = this;
    component.set('isLoading',true);
    component.get("performanceService").findLessonPerformanceByClassAndCourseAndUnit(component.get('userId'), component.get('classModel').id, component.get('classModel').course, unitId).then(function(result){
      component.get('lessons').clear();
      component.get('lessons').pushObjects(result.toArray());
      component.set('isLoading',false);
    });
  }




});
