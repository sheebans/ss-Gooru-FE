import Ember from 'ember';
import Lesson from 'gooru-web/models/content/lesson';
import LessonItem from 'gooru-web/models/content/lessonItem';
import { CREATOR_SYSTEM } from 'gooru-web/config/config';

/**
 * Serializer to support the Lesson CRUD operations
 *
 * @typedef {Object} LessonSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Content/Lesson object into a JSON representation required by the Create Lesson endpoint
   *
   * @param lessonModel - The lesson model to be serialized
   * @returns {Object} JSON Object representation of the lesson model
   */
  serializeCreateLesson: function (lessonModel) {
    return {
      title: lessonModel.get('title'),
      taxonomy: [],   // TODO: pending
      creator_system: CREATOR_SYSTEM
    };
  },

  /**
   * Normalize a lesson response
   * @param lessonData - The endpoint response in JSON format
   * @returns {Content/Lesson} lesson model
   */
  normalizeLesson: function (lessonData) {
    return Lesson.create(Ember.getOwner(this).ownerInjection(), {
      children: function () {

        // TODO: Remove once it's possible to test integration
        var lessonItems = [
          LessonItem.create({
            id: 'lesson-item-123',
            image: '/assets/gooru/question-placeholder-image.png',
            format: 'collection',
            questionCount: 5,
            resourceCount: 5,
            sequence: 1,
            title: 'Collection Name'
          }),
          LessonItem.create({
            id: 'lesson-item-456',
            image: null,
            format: 'assessment',
            questionCount: 10,
            resourceCount: 0,
            sequence: 2,
            title: 'Assessment Name'
          })
        ];

        if (lessonData.collection_summary) {
          lessonItems = lessonData.collection_summary.map(function (lessonItemData) {
            return LessonItem.create({
              id: lessonItemData.id,
              image: lessonItemData.thumbnail,
              format: lessonItemData.format,
              questionCount: lessonItemData.question_count ? lessonItemData.question_count : 0,
              resourceCount: lessonItemData.resource_count ? lessonItemData.resource_count : 0,
              sequence: lessonItemData.sequence_id,
              title: lessonItemData.title
            });
          });
        }
        return Ember.A(lessonItems);
      }(),
      id: lessonData.lesson_id,
      sequence: lessonData.sequence_id,
      title: lessonData.title,
      taxonomy: lessonData.taxonomy.slice(0)
    });
  }

});
