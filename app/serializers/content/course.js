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
   * @returns {CourseModel[]} a CourseModel array
   */
  normalizeGetCourses: function(courseData) {
    const serializer = this;
    if (courseData.courses) {
      return courseData.courses.map(function (course) {
        return serializer.normalizeCourse(course);
      });
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
    return Course.create(Ember.getOwner(serializer).ownerInjection(),{
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
      id: courseData.id,
      title: courseData.title,
      description: courseData.description,
      thumbnailUrl: courseData.thumbnail,
      taxonomy: courseData.taxonomy.slice(0),
      audience: courseData.audience.slice(0),
      isVisibleOnProfile: courseData['visible_on_profile'],
      isPublished: courseData['publish_status'] && courseData['publish_status'] === 'published',
      unitCount: courseData['unit_count'] ? courseData['unit_count'] : 0
      // TODO More properties will be added here...
    });
  }

});
