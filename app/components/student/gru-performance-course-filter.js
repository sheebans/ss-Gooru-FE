import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
/**
 * Student performance course filter
 *
 * Component responsible to show the student  performance course filter.
 * @see controllers/student/class/performance.js
 * @augments ember/Component
 */
export default Ember.Component.extend(ConfigurationMixin, {

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-performance-course-filter'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Expand filter panel
     */
    expandPanel: function (filterType) {
      switch (filterType){
        case 'course':
          this.toggleProperty('isCourseFiltersExpanded');
          break;
        case 'lesson':
          this.toggleProperty('isLessonFiltersExpanded');
          break;
        case 'unit':
          this.toggleProperty('isUnitFiltersExpanded');
          break;
      }
    },
    /**
     * Selects the lesson
     * @param lessonId
     */
    selectLesson: function (lessonId) {
      this.set('lessonId', lessonId);
      this.sendAction('onSelectLesson', lessonId);
    },
    /**
     * Selects the unit
     * @param unitId
     */
    selectUnit: function (unitId) {
      this.set('unitId', unitId);
      this.set('lessonId', null);
      this.sendAction('onSelectUnit', unitId);
    },

    /**
     * Loads report data
     */
    updateReport: function () {
      this.sendAction('onUpdateReport');
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
        courseId: component.get('filterCriteria.courseId')
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string}
   */
  courseId: null,

  /**
   * filter Criteria
   * @property {string}
   */
  filterCriteria: null,

  /**
   * @property {Boolean} isCourseFiltersExpanded
   */
  isCourseFiltersExpanded: true,

  /**
   * @property {Boolean} isUnitFiltersExpanded
   */
  isUnitFiltersExpanded: false,
  /**
   * @property {Boolean} isLessonFiltersExpanded
   */
  isLessonFiltersExpanded: false,

  /**
   * Selected lesson
   * @property {Lesson}
   */
  lesson: Ember.computed('unit.children.[]', 'lessonId', function() {
    const lessons = this.get('unit.children') || [];
    return lessons.findBy('id', this.get('lessonId'));
  }),

  /**
   * @property {Lesson[]}
   */
  lessons: Ember.computed('unit.children.[]', 'lessonId', function() {
    return this.get('unit.children');
  }),

  /**
   * @property {string}
   */
  lessonId: null,

  /**
   * Selected course
   * @property {Course}
   */
  selectedCourse: null,

  /**
   * Selected unit
   * @property {Unit}
   */
  unit: Ember.computed('selectedCourse.children.[]', 'unitId', function() {
    const units = this.get('selectedCourse.children') || [];
    return units.findBy('id', this.get('unitId'));
  }),

  /**
   * @property {Unit[]}
   */
  units: Ember.computed('selectedCourse.children.[]', function() {
    return this.get('selectedCourse.children');
  }),

  /**
   * @property {string}
   */
  unitId: null
});
