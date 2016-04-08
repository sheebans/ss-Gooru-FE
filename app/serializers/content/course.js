import Ember from 'ember';
import Course from 'gooru-web/models/content/course';
import Unit from 'gooru-web/models/content/unit';

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
   * Normalize a class response
   * @param courseData - The endpoint response in JSON format
   * @returns {Content/Course} course model
   */
  normalizeCourse: function (courseData) {
    var serializer = this;

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
      id: courseData.id,
      isPublic: courseData.visible_on_profile,
      title: courseData.title,
      description: courseData.description,
      thumbnailUrl: courseData.thumbnail,
      isVisibleOnProfile: courseData.visible_on_profile,
      audience: courseData.audience.slice(0),
      subject: courseData.subject_bucket,
      taxonomy: courseData.taxonomy.slice(0)
    });
  }

});

