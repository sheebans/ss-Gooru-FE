import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:api-sdk/course-map', 'Unit | Service | api sdk/course map', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('getLessonInfo', function(assert) {
  const service = this.subject();
  const expectedCourseId = 'course-id';
  const expectedUnitId = 'unit-id';
  const expectedLessonId = 'lesson-id';

  assert.expect(5);

  service.set('courseMapAdapter', Ember.Object.create({
    getLessonInfo: function(courseId, unitId, lessonId) {
      assert.equal(courseId, expectedCourseId, 'Wrong course id');
      assert.equal(unitId, expectedUnitId, 'Wrong unit id');
      assert.equal(lessonId, expectedLessonId, 'Wrong lesson id');
      return Ember.RSVP.resolve({ id: lessonId });
    }
  }));

  service.set('courseMapSerializer', Ember.Object.create({
    normalizeLessonInfo: function(lessonData) {
      assert.deepEqual(lessonData, { id: expectedLessonId }, 'Wrong lesson data');
      return lessonData;
    }
  }));

  var done = assert.async();
  service.getLessonInfo(expectedCourseId, expectedUnitId, expectedLessonId)
    .then(response => {
      assert.deepEqual(response, { id: expectedLessonId }, 'Response has to match');
      done();
    });
});
