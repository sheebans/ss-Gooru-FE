import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
/**
 * Student performance filter panel
 *
 * Component responsible to show the student performance filter panel.
 * @see controllers/student/performance.js
 * @augments ember/Component
 */
export default Ember.Component.extend(ConfigurationMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-performance-filter-panel', 'col-md-2', 'col-sm-4', 'col-xs-12'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Selects the course
     * @param courseId
     */
    selectCourse: function (courseId) {
      this.set('courseId', courseId);
      this.set('unitId', null);
      this.set('lessonId', null);
      this.sendAction("onSelectCourse", courseId);
    },

    /**
     * Selects the unit
     * @param unitId
     */
    selectUnit: function (unitId) {
      this.set('unitId', unitId);
      this.set('lessonId', null);
      this.sendAction("onSelectUnit", unitId);
    },

    /**
     * Selects the lesson
     * @param lessonId
     */
    selectLesson: function (lessonId) {
      this.set('lessonId', lessonId);
      this.sendAction("onSelectLesson", lessonId);
    },

    /**
     * Loads report data
     */
    updateReport: function () {
      this.sendAction("onUpdateReport");
    },

    /**
     * Expand filter panel
     */
    expandPanel: function (filterType) {
      switch (filterType){
        case 'course':
          this.toggleProperty('isCourseFiltersExpanded');
          break;
        case 'unit':
          this.toggleProperty('isUnitFiltersExpanded');
          break;
        case 'lesson':
          this.toggleProperty('isLessonFiltersExpanded');
          break;
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  init: function() {
    let component = this;
    component._super( ...arguments );

    if (component.get('filterCriteria')) {
      component.setProperties({
        courseId: component.get('filterCriteria.courseId'),
        unitId: component.get('filterCriteria.unitId'),
        lessonId: component.get('filterCriteria.lessonId')
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Selected course
   * @property {Course}
   */
  selectedCourse: null,

  /**
   * filter Criteria
   * @property {string}
   */
  filterCriteria: null,

  /**
   * @property {string}
   */
  courseId: null,

  /**
   * @property {string}
   */
  unitId: null,

  /**
   * @property {string}
   */
  lessonId: null,

  /**
   * @property {Boolean} isCourseFiltersExpanded
   */
  isCourseFiltersExpanded: true,

  /**
   * @property {Boolean} isCourseFiltersExpanded
   */
  isUnitFiltersExpanded: false,
  /**
   * @property {Boolean} isCourseFiltersExpanded
   */
  isLessonFiltersExpanded: false,

  /**
   * Selected unit
   * @property {Unit}
   */
  unit: Ember.computed('selectedCourse.children.[]', 'unitId', function() {
    const units = this.get('selectedCourse.children') || [];
    debugger;
    return units.findBy('id', this.get('unitId'));
  }),

  /**
   * Selected lesson
   * @property {Lesson}
   */
  lesson: Ember.computed('unit.children.[]', 'lessonId', function() {
    const lessons = this.get('unit.children') || [];
    return lessons.findBy('id', this.get('lessonId'));
  }),

  /**
   * @property {Unit[]}
   */
  units: Ember.computed('selectedCourse.children.[]', 'unitId', function() {
    return this.get('selectedCourse.children');
  }),

  /**
   * @property {Lesson[]}
   */
  lessons: Ember.computed('unit.children.[]', 'lessonId', function() {
    return this.get('unit.children');
  })

  // -------------------------------------------------------------------------
  // Methods

});
