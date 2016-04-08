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

  serializer: null,

  adapter: null,


  init: function () {
    this._super(...arguments);
    this.set('serializer', CourseSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', CourseAdapter.create(Ember.getOwner(this).ownerInjection()));
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
   * Returns a course by id
   * @param {string} courseId
   * @returns {Promise|Content/Course}
   */
  fetchById: function (courseId) {
    return this.get('adapter').getCourseById(courseId)
      .then(function (courseData) {
        return this.get('serializer').normalizeCourse(courseData);
      }.bind(this))
      .catch(function (error) {
        return error;
      });
  },

  /**
   * Creates a new course
   *
   * @param courseModel The Course model to be saved
   * @returns {Promise}
   */
  createCourse: function(courseModel) {
    var courseData = this.get('serializer').serializeCreateCourse(courseModel);

    return this.get('adapter').createCourse({
      body: courseData
    }).then(function (courseId) {
      courseModel.set('id', courseId);
      return courseModel;
    }).catch(function (error) {
      return error;
    });
  }

});
