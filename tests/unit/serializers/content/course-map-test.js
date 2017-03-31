import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:content/course-map', 'Unit | Serializer | content/course-map');

test('normalizeLessonInfo', function(assert) {
  const data = {};
  const expectedData = {};
  const serializer = this.subject();
  const serializedData = serializer.normalizeLessonInfo(data);
  assert.deepEqual(serializedData, expectedData, 'Returned data should match');
});
