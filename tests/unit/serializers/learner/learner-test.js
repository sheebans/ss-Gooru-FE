import { moduleFor, test } from 'ember-qunit';
import { CONTENT_TYPES } from 'gooru-web/config/config';

moduleFor('serializer:learner/learner', 'Unit | Serializer | learner/learner');

test('normalizeLocations', function(assert) {
  const serializer = this.subject();
  const locationsPayload = {
    usageData: [{
      courseId: 'course-id1',
      unitId: 'unit-id1',
      lessonId: 'lesson-id1',
      collectionId: 'collection-id1',
      courseTitle: 'course-title1',
      collectionTitle: 'assessment-title1',
      collectionType: 'assessment',
      status: 'complete',
      lastAccessed: '2017-03-07 18:44:04.798'
    }, {
      courseId: 'course-id1',
      unitId: 'unit-id1',
      lessonId: 'lesson-id1',
      collectionId: 'collection-id1',
      courseTitle: 'course-title1',
      collectionTitle: 'assessment-title1',
      collectionType: 'assessment',
      status: 'complete',
      lastAccessed: '2017-03-07 18:44:04.798'
    }]
  };
  const normalizedLocations = serializer.normalizeLocations(locationsPayload);

  assert.equal(normalizedLocations.length, 2, 'Wrong number of locations');
});

test('normalizeLocation course', function(assert) {
  const serializer = this.subject();
  const locationPayload = {
    courseId: 'course-id',
    courseTitle: 'course-title',
    status: 'complete',
    lastAccessed: '2017-03-07 18:44:04.798'
  };
  const normalizedLocation = serializer.normalizeLocation(locationPayload);

  assert.equal(normalizedLocation.get('courseId'), 'course-id', 'Wrong course id');
  assert.notOk(normalizedLocation.get('collectionId'), 'Wrong collection id');
  assert.notOk(normalizedLocation.get('lessonId'), 'Wrong lesson id');
  assert.notOk(normalizedLocation.get('unitId'), 'Wrong unit id');
  assert.equal(normalizedLocation.get('status'), 'complete', 'Wrong status');
  assert.ok(normalizedLocation.get('isCompleted'), 'Wrong is completed value');
  assert.equal(normalizedLocation.get('title'), 'course-title', 'Wrong title');
  assert.equal(normalizedLocation.get('type'), CONTENT_TYPES.COURSE, 'Wrong type value');
});


test('normalizeLocation collection/assessment', function(assert) {
  const serializer = this.subject();
  const locationPayload = {
    collectionId: 'collection-id',
    collectionTitle: 'collection-title',
    lessonId: 'lesson-id',
    unitId: 'unit-id',
    type: CONTENT_TYPES.COLLECTION,
    status: 'any-status',
    lastAccessed: '2017-03-07 18:44:04.798'
  };
  const normalizedLocation = serializer.normalizeLocation(locationPayload);

  assert.equal(normalizedLocation.get('collectionId'), 'collection-id', 'Wrong collection id');
  assert.equal(normalizedLocation.get('lessonId'), 'lesson-id', 'Wrong lesson id');
  assert.equal(normalizedLocation.get('unitId'), 'unit-id', 'Wrong unit id');
  assert.notOk(normalizedLocation.get('courseId'), 'Wrong course id');
  assert.equal(normalizedLocation.get('status'), 'any-status', 'Wrong status');
  assert.notOk(normalizedLocation.get('isCompleted'), 'Wrong is completed value');
  assert.equal(normalizedLocation.get('title'), 'collection-title', 'Wrong title');
  assert.equal(normalizedLocation.get('type'), CONTENT_TYPES.COLLECTION, 'Wrong type value');
});
