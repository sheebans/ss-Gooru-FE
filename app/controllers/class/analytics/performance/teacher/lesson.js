import Ember from 'ember';

/**
 * Teacher Analytics Performance Controller - Course Level
 *
 * Controller responsible of the logic for the teacher performance at course level
 *
 * @module
 * @see routes/analytics/performance/teacher/course.js
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('class'),

  /**
   * @property {*} teacher performance controller
   */
  teacherController: Ember.inject.controller('class.analytics.performance.teacher'),

  /**
   * @type CollectionService
   */
  collectionService: Ember.inject.service('api-sdk/collection'),


  // -------------------------------------------------------------------------
  // Actions
  actions:{

  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  "class": Ember.computed.reads('classController.class'),

  /**
   * @property {User[]} class students
   */
  students: Ember.computed.reads('classController.members'),

  /**
   * Lesson's collections
   * @property {Collection[]}
   */
  collections: null,

  /**
   * The performanceDataMatrix
   * @property {performanceData[]}
   */

  performanceDataMatrix: null,

  /**
   * The filterBy selected
   * @property {String}
   */
  filterBy: Ember.computed.alias('teacherController.filterBy'),

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  selectedOptions: Ember.computed.alias('teacherController.selectedOptions'),

  /**
   * @property {Unit} unit
   */
  unit: null,

  /**
   * @property {Lesson} lesson
   */
  lesson: null,

  /**
   * @property {Collection} the selected collection
   */
  collection: null,

  /**
   * @property {ReportData} the selected collection report data
   */
  reportData: null,

  /**
   * Indicates if the filters are visible
   * @property {boolean}
   */
  showFilters: Ember.computed.alias("teacherController.showFilters"),


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
});
