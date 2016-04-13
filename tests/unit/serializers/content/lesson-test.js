import { moduleFor, test } from 'ember-qunit';
import Lesson from 'gooru-web/models/content/lesson';
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
