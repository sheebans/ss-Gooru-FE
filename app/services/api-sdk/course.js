import Ember from 'ember';
import StoreMixin from '../../mixins/store';

/**
 * @typedef {Object} CourseService
 */
export default Ember.Service.extend(StoreMixin, {

  /**
   * Returns a course by id
   * @param {string} id
   * @returns {Promise.<Course>}
   */
  findById: function(id) {
    return this.get('store').findRecord('course/course', id);
  }

});
