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

  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  /**
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service('api-sdk/unit'),


  init: function () {
    this._super(...arguments);
    this.set('serializer', CourseSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('adapter', CourseAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Creates a new course
   *
   * @param courseModel The Course model to be saved
   * @returns {Promise}
   */
  createCourse: function (courseModel) {
    var courseData = this.get('serializer').serializeCreateCourse(courseModel);

    return this.get('adapter').createCourse({
      body: courseData
    }).then(function (courseId) {
      courseModel.set('id', courseId);
      return courseModel;
    }).catch(function (error) {
      return error;
    });
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
   * Update existing course
   *
   * @param courseModel The Course model to update
   * @returns {Promise|Content/Course} Course model updated
   */
  updateCourse: function (courseModel, updateAll = true) {
    var courseData = this.get('serializer').serializeUpdateCourse(courseModel,updateAll);
    return this.get('adapter').updateCourse({
      courseId: courseModel.get('id'),
      course: courseData
    }).then(function () {
      return courseModel;
    }).catch(function (error) {
      return error;
    });
  },

  /**
   * Updates the course title
   *
   * @param courseId the id of the course to be updated
   * @param title
   * @returns {Promise}
   */
  updateCourseTitle: function(courseId, title) {
    const service = this;
    let serializedData = service.get('serializer').serializeUpdateCourseTitle(title);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('adapter').updateCourse({
        courseId: courseId,
        course: serializedData
      }).then(resolve, reject);
    });
  },
  /**
   * Delete course
   *
   * @param courseId The Course id to delete
   * @returns {Ember.RSVP.Promise}
   */
  deleteCourse: function (courseId) {
    const service = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      service.get('adapter').deleteCourse(courseId)
        .then(resolve, reject);
    });
  },

  /**
   * Copies a course by id
   * @param {string} courseId
   * @returns {Ember.RSVP.Promise}
   */
  copyCourse: function(courseId){
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('adapter').copyCourse(courseId)
        .then(function(responseData, textStatus, request) {
          resolve(request.getResponseHeader('location'));
        }, reject );
    });
  },

  /**
   * Reorder course units
   *
   * @param courseId the id of the Course to be updated
   * @param {string[]} unitIds
   * @returns {Promise}
   */
  reorderCourse: function(courseId, unitIds) {
    const service = this;
    let serializedData = service.get('serializer').serializeReorderCourse(unitIds);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('adapter').reorderCourse(courseId, serializedData).then(resolve, reject);
    });
  },

  /**
   * Returns a course structure by course
   * @param course The Course model to update
   * @returns {Promise|Content/Course}
   */
  fetchCourseStructure: function (course) {
    let service = this;
    let unitService = service.get('unitService');
    let lessonService = service.get('lessonService');
    let courseId = course.get('id');
    let units = course.get("children");

    //TODO - we need a single end point for this.
    let promise = new Ember.RSVP.Promise(function(resolve) {
      //TODO unit service - fetchUnitsByIds(ids)
      let unitPromises = units.map(function(unit){
        return unitService.fetchById(courseId, unit.get("data.id"));
      });

      Ember.RSVP.all(unitPromises).then(function(units){
        course.set("children", units);
        let promises = units.map(function(unit){
          return new Ember.RSVP.Promise(function(resolveLesson) {
            var lessons = unit.get('children');

            //TODO lesson service - fetchLessonsByIds(ids)
            let lessonPromises = lessons.map(function(lesson){
              return lessonService.fetchById(courseId, unit.get("id"), lesson.get("id"));
            });

            Ember.RSVP.all(lessonPromises).then(function(lessons){
              unit.set("children", lessons);

              resolveLesson();
            });
          });
        });
        Ember.RSVP.all(promises).then(function(){
          resolve(course);
        });
      });
    });

    return promise;
  }
});
