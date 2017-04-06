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

test('createNewPath', function(assert) {
  let service = this.subject();
  let expectedContext = Ember.Object.create({
    courseId: 'course-id',
    unitId: 'unit-id',
    lessonId: 'lesson-id',
    collectionId: 'collection-id'
  });
  let expectedTarget = Ember.Object.create({
    contentType: 'collection',
    contentSubType: 'pre-test',
    courseId: 'course-id',
    unitId: 'unit-id',
    lessonId: 'lesson-id'
  });
  let expectedPathId = 1;

  service.set('courseMapAdapter', Ember.Object.create({
    createNewPath: function(context, target, pathId) {
      assert.deepEqual(context, expectedContext, 'Invalid context data');
      assert.deepEqual(target, expectedTarget, 'Invalid target data');
      assert.equal(pathId, undefined, 'Wrong pathId');
      return Ember.RSVP.resolve(expectedPathId);
    }
  }));

  var done = assert.async();
  service.createNewPath(expectedContext, expectedTarget, undefined)
    .then(response => {
      assert.equal(response, expectedPathId, 'Invalid response value');
      done();
    });
});
