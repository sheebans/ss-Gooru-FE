import Ember from 'ember';

import LessonSerializer from 'gooru-web/serializers/content/lesson';
/**
 * Serializer to support the Collection CRUD operations for API 3.0
 *
 * @typedef {Object} CollectionSerializer
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
   * @param lessonData - The endpoint response in JSON format
   * @returns {Content/Lesson} lesson model
   */
  normalizeLessonInfo: function (data) {
    return this.get('lessonSerializer').normalizeLesson(data.course_path);
  }
});
