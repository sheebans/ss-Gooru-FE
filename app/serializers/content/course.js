import Ember from 'ember';
import Course from 'gooru-web/models/content/course';
import Unit from 'gooru-web/models/content/unit';
import { CREATOR_SYSTEM } from 'gooru-web/config/config';

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
    var courseData = this.get('serializeUpdateCourse')(courseModel);
    courseData.creator_system = CREATOR_SYSTEM;
    return courseData;
  },

  /**
   * Serialize a Course object into a JSON representation required by the Create Edit endpoint
   *
   * @param courseModel The Course model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateCourse: function (courseModel) {
    return {
      title: courseModel.get('title'),
      description: courseModel.get('description'),
      thumbnail: courseModel.get('thumbnailUrl'),
      'visible_on_profile': courseModel.get('isVisibleOnProfile'),
      taxonomy: courseModel.get('taxonomy'),
      audience: courseModel.get('audience'),
      'subject_bucket': courseModel.get('subject')
    };
  },

  /**
   * Normalize an array of courses
   *
   * @param payload endpoint response format in JSON format
   * @returns {Content/Course[]} courseData - An array of course models
   */
  normalizeGetCourses: function(courseData) {
    if (courseData.courses) {
      return courseData.courses.map(function (course) {
        return this.normalizeCourse(course);
      }.bind(this));
    } else {
      return [];
    }
  },


  /**
  * Normalize a class response
  *
  * @param courseData - The endpoint response in JSON format
  * @returns {Content/Course} course model
  */
  normalizeCourse: function(courseData) {
    const serializer = this;

    return Course.create(Ember.getOwner(this).ownerInjection(), {
      children: function () {
        var units = [];
        if (courseData.unitSummary) {
          units = courseData.unitSummary.map(function (unitData) {
            return Unit.create(Ember.getOwner(serializer).ownerInjection(), {
              id: unitData.unit_id,
              sequence: unitData.sequence_id,
              title: unitData.title
            });
          });
        }
        return units;
      }(),
      audience: courseData.audience ? courseData.audience.slice(0) : [],
      description: courseData.description,
      id: courseData.id,
      isPublished: courseData['publish_status'] && courseData['publish_status'] === 'published',
      isVisibleOnProfile: courseData['visible_on_profile'],
      subject: courseData.subject_bucket,
      taxonomy: courseData.taxonomy.slice(0),
      thumbnailUrl: courseData.thumbnail,
      title: courseData.title,
      unitCount: courseData.unit_count ? courseData.unit_count : 0
      // TODO More properties will be added here...
    });
  }

});
