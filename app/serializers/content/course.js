import Ember from 'ember';
import { cleanFilename } from 'gooru-web/utils/utils';
import CourseModel from 'gooru-web/models/content/course';
import UnitSerializer from 'gooru-web/serializers/content/unit';
import { CREATOR_SYSTEM } from 'gooru-web/config/config';

/**
 * Serializer to support the Course CRUD operations for API 3.0
 *
 * @typedef {Object} CourseSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  unitSerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('unitSerializer', UnitSerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Serialize a Course object into a JSON representation required by the Create Course endpoint
   *
   * @param courseModel The Course model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateCourse: function(courseModel) {
    var courseData = this.serializeCourse(courseModel);
    courseData['creator_system'] = CREATOR_SYSTEM;
    return courseData;
  },

  /**
   * Serialize a Course object into a JSON representation required by the Create Edit endpoint
   *
   * @param courseModel The Course model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateCourse: function (courseModel) {
    return this.serializeCourse(courseModel);
  },

  serializeCourse: function(courseModel) {
    return {
      title: courseModel.get('title'),
      description: courseModel.get('description'),
      thumbnail: cleanFilename(courseModel.get('thumbnailUrl')),
      'visible_on_profile': courseModel.get('isVisibleOnProfile'),
      taxonomy: courseModel.get('taxonomy'),
      'subject_bucket': courseModel.get('subject')
    };
  },

  /**
   * Normalize an array of courses
   *
   * @param payload endpoint response format in JSON format
   * @returns {Content/Course[]} courseData - An array of course models
   */
  normalizeGetCourses: function(payload) {
    const serializer = this;
    if (payload.courses && Ember.isArray(payload.courses)) {
      return payload.courses.map(function(course) {
        return serializer.normalizeCourse(course);
      });
    } else {
      return [];
    }
  },

  /**
  * Normalize a Course response
  *
  * @param payload - The endpoint response in JSON format
  * @returns {Content/Course} Course Model
  */
  normalizeCourse: function(payload) {
    const serializer = this;
    return CourseModel.create(Ember.getOwner(serializer).ownerInjection(), {
      id: payload.id,
      children: serializer.get('unitSerializer').normalizeUnits(payload.unit_summary),
      description: payload.description,
      isPublished: payload['publish_status'] && payload['publish_status'] === 'published',
      isVisibleOnProfile: payload['visible_on_profile'],
      subject: payload.subject_bucket,
      taxonomy: payload.taxonomy ? payload.taxonomy.slice(0) : null,
      thumbnailUrl: payload.thumbnail ? serializer.get('session.cdnUrls.content') + payload.thumbnail : null,
      title: payload.title,
      unitCount: payload.unit_count ? payload.unit_count : 0
      // TODO More properties will be added here...
    });
  }

});
