import Ember from 'ember';
import StoreMixin from '../../mixins/store';

/**
 * Unit Service
 *
 * Service responsible for retrieving all data related to the unit model
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 *
 * @typedef {Object} UnitService
 * @augments Ember/Service
 */
export default Ember.Service.extend(StoreMixin, {

  /**
   * Find all units by class and course allowed for the current user
   * @param {string} classId class identifier
   * @param {string} courseId course identifier
   * @param {Object} options request options, like pagination, sort, etc
   * @returns {Promise.<Unit[]>} returns an array of units

   */
  findByClassAndCourse: function(classId, courseId, options = {}) {
    return this.get('store').queryRecord('unit/unit', {
      classId: classId,
      courseId: courseId,
      options: options
    });
  }

});
