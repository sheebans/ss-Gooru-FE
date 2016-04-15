import { moduleFor, test } from 'ember-qunit';
//import Ember from 'ember';
import Lesson from 'gooru-web/models/content/lesson';
//import LessonItem from 'gooru-web/models/content/lessonItem';
import { CREATOR_SYSTEM } from 'gooru-web/config/config';

moduleFor('serializer:content/lesson', 'Unit | Serializer | content/lesson');

test('serializeCreateLesson', function (assert) {
  const serializer = this.subject();

  const modelInstance = Lesson.create({
    id: 'lesson-id-123',
    sequence: 1,
    standards: [],
    title: 'Lesson Title'
  });

  const expected = {
    title: modelInstance.get('title'),
    taxonomy: [], // TODO: pending
    creator_system: CREATOR_SYSTEM
  };

  const modelObject = serializer.serializeCreateLesson(modelInstance);
  assert.deepEqual(modelObject, expected, 'Serializer response');
});

// TODO: Uncomment once it's possible to test integration
// see /app/serializers/content/lesson.js#normalize lesson
//
//test('normalizeLesson', function (assert) {
//  const serializer = this.subject();
//
//  const payload = {
//    "lesson_id": "lesson-id-789",
//    "unit_id": "unit-id-456",
//    "course_id": "course-id-123",
//    "title": "Lesson title",
//    "created_at": "2016-03-10T08:19:17Z",
//    "updated_at": "2016-03-10T08:19:17Z",
//    "creator_id": "owner-id",
//    "modifier_id": "owner-id",
//    "owner_id": "owner-id",
//    "original_creator_id": null,
//    "original_lesson_id": null,
//    "metadata": null,
//    "taxonomy": [
//      "K12.MA-MA2",
//      "K12.MA-MAK-CC"
//    ],
//    "sequence_id": 4,
//    "is_deleted": false,
//    "creator_system": "gooru",
//    "collection_summary": [
//      {
//        "id": "collection-id-123",
//        "title": "Collection title",
//        "format": "collection",
//        "sequence_id": 1,
//        "thumbnail" : "259b732c-2672-4780-9616-2c7a35d2d526.png",
//        "resource_count": 5,
//        "question_count": 5
//      },
//      {
//        "id": "assessment-id-456",
//        "title": "Assessment title",
//        "format": "assessment",
//        "sequence_id": 2,
//        "thumbnail" : null,
//        "resource_count": null,
//        "question_count": 10
//      }
//    ]
//  };
//
//  var expected = Lesson.create(Ember.getOwner(this).ownerInjection(), {
//    children: Ember.A([
//      LessonItem.create({
//        id: payload.collection_summary[0].id,
//        image: payload.collection_summary[0].thumbnail,
//        format: payload.collection_summary[0].format,
//        questionCount: payload.collection_summary[0].question_count,
//        resourceCount: payload.collection_summary[0].resource_count,
//        sequence: payload.collection_summary[0].sequence_id,
//        title: payload.collection_summary[0].title
//      }),
//      LessonItem.create({
//        id: payload.collection_summary[1].id,
//        image: payload.collection_summary[1].thumbnail,
//        format: payload.collection_summary[1].format,
//        questionCount: payload.collection_summary[1].question_count,
//        resourceCount: 0,
//        sequence: payload.collection_summary[1].sequence_id,
//        title: payload.collection_summary[1].title
//      })
//    ]),
//    id: payload.lesson_id,
//    sequence: payload.sequence_id,
//    title: payload.title,
//    taxonomy: payload.taxonomy.slice(0)
//  });
//
//  const result = serializer.normalizeLesson(payload);
//  assert.deepEqual(result, expected, 'Serialized response');
//});
