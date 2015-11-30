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
   * Find all lessons by class, course and unit allowed for the current user
   * @param {string} classId class identifier
   * @param {string} courseId course identifier
   * @param {string} unitId course identifier
   * @param {Object} options request options, like pagination, sort, etc
   * @returns {Promise.<Unit[]>} returns an array of units

   */
  findByClassCourseAndUnit: function(classId, courseId, unitId, options = {}) {
    return this.get('store').queryRecord('lesson/lesson', {
      classId: classId,
      courseId: courseId,
      unitId: unitId,
      options: options
    });
  }

});
