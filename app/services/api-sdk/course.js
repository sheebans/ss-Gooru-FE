import Ember from 'ember';
import DS from 'ember-data';
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
  },

  /**
   * TODO: Creates a new course model
   * @returns {Course}
   */
  create: function (course) {
    // Add a fictitious id to the course
    course.set('id', 456);

    // Simulate async data returned by the service
    return DS.PromiseObject.create({
      promise: new Ember.RSVP.resolve(course)
    });
  }

});
