import Ember from 'ember';
import LessonSerializer from 'gooru-web/serializers/content/lesson';

/**
 * Serializer to support the Course Map operations
 *
 * @typedef {Object} CourseMapSerializer
 */
export default Ember.Object.extend({

  /**
   * @property {LessonSerializer} lessonSerializer
   */
  lessonSerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('lessonSerializer', LessonSerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Normalize a lesson info response
   * @param data - The endpoint response in JSON format
   * @returns {Content/Lesson} lesson model
   */
  normalizeLessonInfo: function (data) {
    return this.get('lessonSerializer').normalizeLesson(data.course_path);
  }
});
