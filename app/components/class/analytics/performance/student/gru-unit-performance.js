import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  performanceService: Ember.inject.service('api-sdk/performance'),

  lessonService: Ember.inject.service('api-sdk/lesson'),

  collectionService: Ember.inject.service('api-sdk/collection'),

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
        component.get('onLocationUpdate')('', 'unit');
        component.set('selectedUnitId', undefined);
        component.notifySelectedLesson('');
      }
      else{
        $('.gru-unit-performance-container.selected').removeClass('selected');
        element.addClass('selected');
        //When clicking on a unit to open it set the unit query param and the selectedUnitId attribute
        component.get('onLocationUpdate')(unit.get('id'), 'unit');
        component.set('selectedUnitId',unit.get('id'));

        if(hasLessonsOpen.length>0){
          //If the unit has lessons open, set its first lesson as the lesson query params and set the selectedLessonId property
          component.notifySelectedLesson(hasLessonsOpen.attr('id'));
        }else{
          //Remove the query params if the unit does not have any.
          component.notifySelectedLesson('');
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
     * Update selected lesson action
     * @param {string} lessonId
     */
    updateSelectedLesson: function (lessonId) {
      const component = this;
      component.notifySelectedLesson(lessonId);
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
  lessons: null,
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
    const classId = this.get('classModel.id');
    const courseId = this.get('classModel.course');
    const userId = this.get('userId');
    const hasNoLessons = !this.get('lessons');

    if(hasNoLessons) {
      component.set('isLoading', true);
      this.get('lessonService').findByClassAndCourseAndUnit(classId, courseId, unitId)
        .then(function(lessons) {
          component.get('performanceService').findStudentPerformanceByUnit(userId, classId, courseId, unitId, lessons)
            .then(function(lessonPerformances) {
              lessonPerformances.forEach(function(lessonPerformance) {
                const lessonId = lessonPerformance.get('id');
                component.get('collectionService').findByClassAndCourseAndUnitAndLesson(classId, courseId, unitId, lessonId)
                  .then(function(collections) {
                    component.get('performanceService').findStudentPerformanceByLesson(userId, classId, courseId, unitId, lessonId, collections)
                      .then(function(collectionPerformances) {
                        lessonPerformance.set('collections', collectionPerformances);
                      });
                  });
              });
              component.set('lessons', lessonPerformances);
              component.set('isLoading', false);
            });
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
  },

  /**
   * Trigger the 'onLocationUpdate' event handler with the lesson information
   *
   * @function actions:updateLesson
   */
  notifySelectedLesson: function (lessonId) {
    const component = this;
    if(lessonId){
      component.set('selectedLessonId',lessonId);
    }else{
      component.set('selectedLessonId',undefined);
    }
    component.get('onLocationUpdate')(lessonId, 'lesson');
  }
});
