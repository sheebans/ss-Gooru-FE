import Ember from 'ember';
import LessonSerializer from 'gooru-web/serializers/content/lesson';
import CollectionSerializer from 'gooru-web/serializers/content/collection';

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
  /**
   * @property {CollectionSerializer} collectionSerializer
   */
  collectionSerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('lessonSerializer', LessonSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('collectionSerializer', CollectionSerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Normalize a lesson info response
   * @param data - The endpoint response in JSON format
   * @returns {Object} lesson and alternate paths
   */
  normalizeLessonInfo: function (data) {
    let alternatePaths = this.normalizeAlternatePaths(data.alternate_paths);
    let lesson = this.get('lessonSerializer').normalizeLesson(data.course_path);
    lesson.get('children').unshift(...alternatePaths);
    return lesson;
  },

  /**
   * Normalize the alternate paths for a lesson
   * @param data - The alternate paths in JSON format
   * @returns {Collection[]} alternate paths list
   */
  normalizeAlternatePaths: function (data) {
    return Ember.isArray(data) ? data.map(
      path => this.get('collectionSerializer').normalizeReadCollection(path)
    ) : [];
  }
});
