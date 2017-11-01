import Ember from 'ember';

/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default Ember.Controller.extend({
  queryParams: [
    'collectionUrl',
    'unitId',
    'lessonId',
    'collectionId',
    'pathId',
    'source',
    'collectionType',
    'classId'
  ],

  actions: {},

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean}
   */
  isDone: false,

  /**
   * Show the next button and send events
   * @property {Boolean} sendEvents
   */
  sendEvents: Ember.computed.not('collectionUrl'),

  /**
   * Extracted the course version from course object
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version'),

  /**
   * @property {String} It decide to show the back to course map or not.
   */
  showBackToCourseMap: false,

  /**
   * @property {String} It decide to show the back to collection or not.
   */
  showBackToCollection: true,

  /**
   * Indicates if it should default player header
   * @property {boolean}
   */
  showPlayerHeader: true
});
