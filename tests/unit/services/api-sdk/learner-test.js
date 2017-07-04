import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/learner', 'Unit | Service | api-sdk/learner');

test('fetchLocations', function(assert) {
  const service = this.subject();

  assert.expect(6);

  service.set('learnerAdapter', Ember.Object.create({
    fetchLocations: function(userId, contentType, offset, limit) {
      assert.deepEqual(userId, 'user-id', 'Wrong user id');
      assert.deepEqual(contentType, 'collection', 'Wrong content type');
      assert.deepEqual(offset, 0, 'Wrong default offset');
      assert.deepEqual(limit, 20, 'Wrong default limit');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('learnerSerializer', Ember.Object.create({
    normalizeLocations: function(payload) {
      assert.deepEqual(payload, [], 'Wrong locations payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchLocations('user-id', 'collection')
    .then(response => {
      assert.deepEqual(response, [], 'Wrong response');
      done();
    });
});

test('fetchPerformance', function(assert) {
  const service = this.subject();

  assert.expect(6);

  service.set('learnerAdapter', Ember.Object.create({
    fetchPerformance: function(userId, contentType, offset, limit) {
      assert.deepEqual(userId, 'user-id', 'Wrong user id');
      assert.deepEqual(contentType, 'collection', 'Wrong content type');
      assert.deepEqual(offset, 0, 'Wrong default offset');
      assert.deepEqual(limit, 20, 'Wrong default limit');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('learnerSerializer', Ember.Object.create({
    normalizePerformances: function(payload) {
      assert.deepEqual(payload, [], 'Wrong performance payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchPerformance('user-id', 'collection')
    .then(response => {
      assert.deepEqual(response, [], 'Wrong response');
      done();
    });
});


test('fetchPerformanceLesson', function(assert) {
  const service = this.subject();

  assert.expect(6);

  service.set('learnerAdapter', Ember.Object.create({
    fetchPerformanceLesson: function(courseId, unitId, lessonId, collectionType) {
      assert.deepEqual(courseId, 'course-id', 'Wrong course id');
      assert.deepEqual(unitId, 'unit-id', 'Wrong unit id');
      assert.deepEqual(lessonId, 'lesson-id', 'Wrong lesson id');
      assert.deepEqual(collectionType, 'collection', 'Wrong collection type');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('learnerSerializer', Ember.Object.create({
    normalizePerformancesLesson: function(payload) {
      assert.deepEqual(payload, [], 'Wrong performance payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchPerformanceLesson('course-id','unit-id','lesson-id', 'collection')
    .then(response => {
      assert.deepEqual(response, [], 'Wrong response');
      done();
    });
});

test('fetchPerformanceUnit', function(assert) {
  const service = this.subject();
  assert.expect(4);

  service.set('learnerAdapter', Ember.Object.create({
    fetchPerformanceUnit: function(courseId, unitId) {
      assert.deepEqual(courseId, 'course-id', 'Wrong course id');
      assert.deepEqual(unitId, 'unit-id', 'Wrong unit id');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('learnerSerializer', Ember.Object.create({
    normalizePerformancesUnit: function(payload) {
      assert.deepEqual(payload, [], 'Wrong performance payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchPerformanceUnit('course-id','unit-id')
    .then(response => {
      assert.deepEqual(response, [], 'Wrong response');
      done();
    });
});

test('fetchPerformance', function(assert) {
  const service = this.subject();

  assert.expect(4);
  const expectedCourseIds = ['course-id-1', 'course-id-2'];

  service.set('learnerAdapter', Ember.Object.create({
    fetchCoursesPerformance: function(userId, courseIds) {
      assert.equal(userId, 'user-id', 'Wrong user id');
      assert.deepEqual(courseIds, expectedCourseIds , 'Wrong content type');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('learnerSerializer', Ember.Object.create({
    normalizePerformances: function(payload) {
      assert.deepEqual(payload, [], 'Wrong performance payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchCoursesPerformance('user-id', expectedCourseIds)
    .then(response => {
      assert.deepEqual(response, [], 'Wrong response');
      done();
    });
});

test('fetchLocationCourse', function(assert) {
  const service = this.subject();

  assert.expect(4);

  service.set('learnerAdapter', Ember.Object.create({
    fetchLocationCourse: function(courseId, userId) {
      assert.deepEqual(courseId, 'course-id', 'Wrong course id');
      assert.deepEqual(userId, 'user-id', 'Wrong user id');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('learnerSerializer', Ember.Object.create({
    normalizeFetchLocationCourse: function(payload) {
      assert.deepEqual(payload, [], 'Wrong performance payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchLocationCourse('course-id','user-id')
    .then(response => {
      assert.deepEqual(response, [], 'Wrong response');
      done();
    });
});
