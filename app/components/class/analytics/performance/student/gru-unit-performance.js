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

      component.loadLessons(unit.get('id'));

      let element =$('#'+ component.get('elementId')) ;

      let hasLessonsOpen = element.find('#'+unit.get('id')+' .gru-lesson-performance-container .collections-container.in');

      if(element.hasClass('selected')){
        element.removeClass('selected');
        //When clicking on a unit to close it, remove the unit and lesson query params
        this.get('onLocationUpdate')('', 'unit');
        this.set('selectedUnitId', undefined);
        this.get('onLocationUpdate')('', 'lesson');
        this.set('selectedLessonId', undefined);
      }
      else{
        $('.gru-unit-performance-container.selected').removeClass('selected');
        element.addClass('selected');
        //When clicking on a unit to open it set the unit query param and the selectedUnitId attribute
        this.get('onLocationUpdate')(unit.get('id'), 'unit');
        this.set('selectedUnitId',unit.get('id'));

        if(hasLessonsOpen.length>0){
          //If the unit has lessons open, set its first lesson as the lesson query params and set the selectedLessonId property
          this.get('onLocationUpdate')(hasLessonsOpen.attr('id'), 'lesson');
          this.set('selectedLessonId', hasLessonsOpen.attr('id'));
        }else{
          //Remove the query params if the unit does not have any.
          this.get('onLocationUpdate')('', 'lesson');
          this.set('selectedLessonId', undefined);
        }
      }
    },
    /**
     * @function actions:selectResource
     * @param {string} collectionId - Identifier for a resource (collection/assessment)
     */
    selectResource: function (collectionId) {
      this.get('onSelectResource')(collectionId);
    },
    /**
     * Trigger the 'onLocationUpdate' event handler with the lesson information
     *
     * @function actions:updateLesson
     */
    updateSelectedLesson: function (lessonId) {
      if(lessonId){
        this.set('selectedLessonId',lessonId);
      }else{
        this.set('selectedLessonId',undefined);
      }
      this.get('onLocationUpdate')(lessonId, 'lesson');

    }
  },
  // -------------------------------------------------------------------------
  // Events


  didInsertElement:function(){
    if(this.get('unit.id')===this.get('selectedUnitId')){
      this.loadSelectedItems(this.get('unit'));
    }
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * Selected option to show when on extra small
   *
   * @property {String}
   */
  selectedOption: null,
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
  localIndex:null,
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
   * Currently selected unit Id
   *
   * @property {String}
   */
  selectedUnitId:undefined,
  /**
   * Currently selected lesson Id
   *
   * @property {String}
   */
  selectedLessonId:undefined,
  /**
   * Performance model for the unit
   *
   * @property {performance/performance}
   */
  unit:null,

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
    if(!component.get('lessons')){
      component.get("performanceService").findLessonPerformanceByClassAndCourseAndUnit(
        component.get('userId'),
        component.get('classModel.id'),
        component.get('classModel.course'),
        unitId).then(function(result){
          //TODO: Remove setting the completion values here, this is for testing the completion possible values on an assesment or collection.
          if(result.length && result[0].get('collections.firstObject')){
            result[0].get('collections.firstObject').set('completionTotal',10);
            result[0].get('collections.firstObject').set('completionDone',10);
          }

          component.set('lessons',result);
          component.set('isLoading',false);
        });
    }
  },
  loadSelectedItems: function(unit){
    const component = this;
    component.loadLessons(unit.get('id'));
    let element =$('#'+ component.get('elementId'));
    let collapsibleElement=$('#'+unit.get('id'));
    element.addClass('selected');
    collapsibleElement.collapse({toggle:true,parent:'.gru-student-performance-container'});
  }
});
