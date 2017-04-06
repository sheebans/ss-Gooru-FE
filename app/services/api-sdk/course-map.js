import Ember from 'ember';
import CourseMapSerializer from 'gooru-web/serializers/content/course-map';
import CourseMapAdapter from 'gooru-web/adapters/content/course-map';

/**
 * @typedef {Object} CourseMapService
 */
export default Ember.Service.extend({

  /**
   * @property {CourseMapSerializer} courseMapSerializer
   */
  courseMapSerializer: null,

  /**
   * @property {CourseMapAdapter} courseMapAdapter
   */
  courseMapAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('courseMapSerializer', CourseMapSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('courseMapAdapter', CourseMapAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Gets the lesson infor for course map
   * @param {string} courseId - course the lesson belongs to
   * @param {string} unitId - unit the lesson belongs to
   * @param {string} lessonId - lesson ID to search for
   * @returns {Promise}
   */
  getLessonInfo: function (courseId, unitId, lessonId){
    const service = this;
    return new Ember.RSVP.Promise((resolve, reject) => {
      service.get('courseMapAdapter').getLessonInfo(courseId, unitId, lessonId)
        .then(
          response => resolve(
            service.get('courseMapSerializer').normalizeLessonInfo(response)
          ),
          reject
        );
    });
  },

  /**
   * Creates a New Path based on the Context data.
   * @param {Object} context - is the base context data used to define a new path. It is an object with these properties
   * { courseId, classId, unitId, lessonId, collectionId }
   * @param {Object} target - the target context. It is an object with these properties
   * { courseId, unitId, lessonId, collectionId }
   * @param {Integer} pathId - an optional parameter with a Path Id.
   * @returns {Ember.RSVP.Promise}
   */
  createNewPath: function (context, target, pathId) {
    return this.get('courseMapAdapter').createNewPath(context, target, pathId);
  }

});
