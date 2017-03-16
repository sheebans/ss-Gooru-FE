import Ember from 'ember';

/**
 * Teacher Performance Controller
 *
 * Controller responsible of the logic for the teacher performance
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['collectionType', 'unitId', 'lessonId', 'courseId'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string}
   */
  collectionType: 'assessment',

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

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Expand filter panel
     */
    expandPanel: function (filterType) {
      if (filterType === 'course') {
        this.toggleProperty('isCourseFiltersExpanded');
      }
      if (filterType === 'unit') {
        this.toggleProperty('isUnitFiltersExpanded');
      }
      if (filterType === 'lesson') {
        this.toggleProperty('isLessonFiltersExpanded');
      }
    }
  }

  // -------------------------------------------------------------------------
  // Methods

});
