import Ember from 'ember';
import StoreMixin from '../../mixins/store';

/**
 * Lesson Service
 *
 * Service responsible for retrieving all data related to the lesson model
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 *
 * @typedef {Object} LessonService
 * @augments Ember/Service
 */
export default Ember.Service.extend(StoreMixin, {

  /**
   * Gets a Lesson by ID that belongs to a course and unit.
   * @param courseId
   * @param unitId
   * @param options
   * @returns {Lesson}
   */
  findById: function(courseId, unitId, lessonId, options = {}) {
    options.queryType = 'byId';
    return this.get('store').queryRecord('lesson/lesson', {
      courseId: courseId,
      unitId: unitId,
      lessonId: lessonId,
      options: options
    });
  },

  /**
   * Gets all lessons by specific class, course and unit allowed for the current user
   * @param {string} classId class identifier
   * @param {string} courseId course identifier
   * @param {string} unitId course identifier
   * @param {Object} options request options, like pagination, sort, etc
   * @returns {Promise.<Lesson[]>} returns an array of lessons

   */
  findByClassAndCourseAndUnit: function(classId, courseId, unitId, options = {}) {
    return this.get('store').queryRecord('lesson/lesson', {
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      options: options
    });
  }

});
