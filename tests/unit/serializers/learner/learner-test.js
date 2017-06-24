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
    lastAccessed: '2017-03-07 18:44:04.798',
    collectionId: 'collection-id',
    collectionTitle: 'collection-title',
    collectionType: CONTENT_TYPES.COLLECTION
  };
  const normalizedLocation = serializer.normalizeLocation(locationPayload);

  assert.equal(normalizedLocation.get('courseId'), 'course-id', 'Wrong course id');
  assert.notOk(normalizedLocation.get('collectionId'), 'Wrong collection id');
  assert.notOk(normalizedLocation.get('lessonId'), 'Wrong lesson id');
  assert.notOk(normalizedLocation.get('unitId'), 'Wrong unit id');
  assert.equal(normalizedLocation.get('currentId'), 'collection-id', 'Wrong current id');
  assert.equal(normalizedLocation.get('currentTitle'), 'collection-title','Wrong current title');
  assert.equal(normalizedLocation.get('currentType'), CONTENT_TYPES.COLLECTION, 'Wrong current type');
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
    collectionType: CONTENT_TYPES.COLLECTION,
    lessonId: 'lesson-id',
    unitId: 'unit-id',
    status: 'any-status',
    lastAccessed: '2017-03-07 18:44:04.798'
  };
  const normalizedLocation = serializer.normalizeLocation(locationPayload);

  assert.equal(normalizedLocation.get('collectionId'), 'collection-id', 'Wrong collection id');
  assert.equal(normalizedLocation.get('lessonId'), 'lesson-id', 'Wrong lesson id');
  assert.equal(normalizedLocation.get('unitId'), 'unit-id', 'Wrong unit id');
  assert.notOk(normalizedLocation.get('courseId'), 'Wrong course id');
  assert.notOk(normalizedLocation.get('currentId'), 'Wrong current id');
  assert.notOk(normalizedLocation.get('currentTitle'), 'Wrong current title');
  assert.notOk(normalizedLocation.get('currentType'), 'Wrong current type');
  assert.equal(normalizedLocation.get('status'), 'any-status', 'Wrong status');
  assert.notOk(normalizedLocation.get('isCompleted'), 'Wrong is completed value');
  assert.equal(normalizedLocation.get('title'), 'collection-title', 'Wrong title');
  assert.equal(normalizedLocation.get('type'), CONTENT_TYPES.COLLECTION, 'Wrong type value');
});

test('normalizePerformances', function(assert) {
  const serializer = this.subject();
  const performancePayload = {
    usageData: [{
      courseId: "course-id1",
      courseTitle: 'course-title1',
      timeSpent: 23860,
      completedCount: 0,
      scoreInPercentage: 0,
      totalCount: 10,
      collectionId: null,
      collectionTitle: null,
      attempts: null
    }, {
      courseId: "course-id1",
      courseTitle: 'course-title1',
      timeSpent: 23860,
      completedCount: 0,
      scoreInPercentage: 0,
      totalCount: 10,
      collectionId: null,
      collectionTitle: null,
      attempts: null
    }]
  };
  const normalizedPerformances = serializer.normalizePerformances(performancePayload);

  assert.equal(normalizedPerformances.length, 2, 'Wrong number of performance');
});

test('normalizePerformance course', function(assert) {
  const serializer = this.subject();
  const performancePayload = {
    courseId: "course-id",
    courseTitle: 'course-title',
    timeSpent: 23860,
    completedCount: 0,
    scoreInPercentage: 0,
    totalCount: 10,
    collectionId: null,
    collectionTitle: null,
    attempts: null
  };
  const normalizedPerformance = serializer.normalizePerformance(performancePayload);

  assert.equal(normalizedPerformance.get('courseId'), 'course-id', 'Wrong course id');
  assert.equal(normalizedPerformance.get('courseTitle'), 'course-title', 'Wrong course title');
  assert.equal(normalizedPerformance.get('timeSpent'), 23860, 'Wrong time spent');
  assert.equal(normalizedPerformance.get('completedCount'), 0, 'Wrong completed count');
  assert.equal(normalizedPerformance.get('scoreInPercentage'), 0, 'Wrong score in percentage');
  assert.equal(normalizedPerformance.get('totalCount'), 10, 'Wrong total count');
  assert.equal(normalizedPerformance.get('collectionId'), null, 'Collection id should be null');
  assert.equal(normalizedPerformance.get('collectionTitle'), null, 'Collection title should be null');
  assert.equal(normalizedPerformance.get('attempts'), null, 'Attempts should be null');
});

test('normalizePerformance assessment/collection', function(assert) {
  const serializer = this.subject();
  const performancePayload = {
    courseId: null,
    courseTitle: null,
    totalCount: null,
    completedCount: null,
    collectionId: 'assessment-id',
    collectionTitle: 'assessment-title',
    attempts: 4,
    timeSpent: 23860,
    scoreInPercentage: 100
  };
  const normalizedPerformance = serializer.normalizePerformance(performancePayload);

  assert.equal(normalizedPerformance.get('courseId'), null, 'Course id should be null');
  assert.equal(normalizedPerformance.get('courseTitle'), null, 'Course title should be null');
  assert.equal(normalizedPerformance.get('totalCount'), null, 'Total count should be null');
  assert.equal(normalizedPerformance.get('completedCount'), null, 'Completed count should be null');
  assert.equal(normalizedPerformance.get('collectionId'), 'assessment-id', 'Wrong assessment id');
  assert.equal(normalizedPerformance.get('collectionTitle'), 'assessment-title', 'Wrong assessment title');
  assert.equal(normalizedPerformance.get('attempts'), 4, 'Wrong number of attempts');
  assert.equal(normalizedPerformance.get('timeSpent'), 23860, 'Wrong time spent');
  assert.equal(normalizedPerformance.get('scoreInPercentage'), 100, 'Wrong score in percentage');
});
