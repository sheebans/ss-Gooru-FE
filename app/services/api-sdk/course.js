import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import CourseSerializer from 'gooru-web/serializers/content/course';
import CourseAdapter from 'gooru-web/adapters/content/course';


/**
 * Service to support the Course CRUD operations
 *
 * @typedef {Object} CourseService
 */
export default Ember.Service.extend(StoreMixin, {

  courseSerializer: null,

  courseAdapter: null,


  init: function () {
    this._super(...arguments);
    this.set('courseSerializer', CourseSerializer.create());
    this.set('courseAdapter', CourseAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Returns a course by id
   * @param {string} id
   * @returns {Promise.<Course>}
   */
  findById: function(id) {
    return this.get('store').findRecord('course/course', id);
  },

  /**
   * Creates a new course
   *
   * @param courseModel The Course model to be saved
   * @returns {Promise}
   */
  createCourse: function(courseModel) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedCourseModel = service.get('courseSerializer').serializeCreateCourse(courseModel);
      service.get('courseAdapter').createCourse({
        body: serializedCourseModel
      }).then(function(responseData, textStatus, request) {
        let courseId = request.getResponseHeader('location');
        courseModel.set('id', courseId);
        resolve(courseModel);
      }, function(error) {
        reject(error);
      });
    });
  }

});
