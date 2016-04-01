import Ember from 'ember';
import CourseModel from 'gooru-web/models/content/course';

/**
 * Serializer to support the Course CRUD operations for API 3.0
 *
 * @typedef {Object} CourseSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Course object into a JSON representation required by the Create Course endpoint
   *
   * @param courseModel The Course model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateCourse: function(courseModel) {
    return {
      title: courseModel.get('title'),
      description: courseModel.get('description'),
      thumbnail: courseModel.get('thumbnailUrl'),
      'visible_on_profile': courseModel.get('isVisibleOnProfile'),
      taxonomy: courseModel.get('taxonomy'),
      audience: courseModel.get('audience'),
      'subject_bucket' : courseModel.get('subject'),
      'creator_system': 'gooru'
    };
  },

  /**
   * Normalize an array of courses
   *
   * @param payload endpoint response format in JSON format
   * @returns {CourseModel[]} a CourseModel array
   */
  normalizeGetCourses: function(payload) {
    const serializer = this;
    if (payload.courses) {
      return payload.courses.map(function (course) {
        return serializer.normalizeCourse(course);
      });
    } else {
      return [];
    }
  },

  /**
   * Normalize a single course
   *
   * @param payload endpoint response format in JSON format
   * @returns {CourseModel}
   */
  normalizeCourse: function(payload) {
    return CourseModel.create({
      id: payload.id,
      title: payload.title,
      thumbnailUrl: payload.thumbnail,
      taxonomy: payload.taxonomy,
      isVisibleOnProfile: payload['visible_on_profile'],
      isPublished: payload['publish_status'] && payload['publish_status'] === 'published'
      // TODO More properties will be added here...
    });
  }

});
