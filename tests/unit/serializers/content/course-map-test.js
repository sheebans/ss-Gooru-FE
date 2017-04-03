import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:content/course-map', 'Unit | Serializer | content/course-map');

test('normalizeLessonInfo', function(assert) {
  const data = {
    course_path: 'lesson'
  };
  const expectedData = 'normalized-lesson';
  const serializer = this.subject();
  serializer.set('lessonSerializer', {
    normalizeLesson: lesson => {
      assert.equal(lesson, 'lesson', 'Normalize param should match');
      return 'normalized-lesson';
    }
  });
  const serializedData = serializer.normalizeLessonInfo(data);
  assert.equal(serializedData, expectedData, 'Returned data should match');
});
