import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:learner/learner', 'Unit | Adapter | learner/learner');

test('fetchLocations', function(assert) {
  assert.expect(5);
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus-insights/v2/learner/location', request => {
      assert.equal(request.queryParams.userId, 'user-id', 'Wrong user id');
      assert.equal(request.queryParams.contentType, 'collection', 'Wrong content type');
      assert.equal(request.queryParams.offset, 0, 'Wrong offset');
      assert.equal(request.queryParams.limit, 20, 'Wrong limit');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  let offset = 0;
  let limit = 20;
  let userId = 'user-id';
  let contentType = 'collection';
  adapter.fetchLocations(userId, contentType, offset, limit)
    .then(response => assert.deepEqual({}, response, 'Wrong response'));
});

test('fetchPerformance', function(assert) {
  assert.expect(5);
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus-insights/v2/learner/performance', request => {
      assert.equal(request.queryParams.userId, 'user-id', 'Wrong user id');
      assert.equal(request.queryParams.contentType, 'collection', 'Wrong content type');
      assert.equal(request.queryParams.offset, 0, 'Wrong offset');
      assert.equal(request.queryParams.limit, 20, 'Wrong limit');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  let offset = 0;
  let limit = 20;
  let userId = 'user-id';
  let contentType = 'collection';
  adapter.fetchPerformance(userId, contentType, offset, limit)
    .then(response => assert.deepEqual({}, response, 'Wrong response'));
});

test('fetchCoursesPerformance', function(assert) {
  assert.expect(3);
  const adapter = this.subject();
  const expectedUserId = 'user-id';
  const expectedCourseIds = ['course-id-1', 'course-id-2'];
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.post('/api/nucleus-insights/v2/courses/learner/performance', request => {
      let { userId, courseIds } = JSON.parse(request.requestBody);
      assert.equal(userId, expectedUserId, 'Wrong user id');
      assert.deepEqual(courseIds, expectedCourseIds, 'Wrong content type');
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.fetchCoursesPerformance(expectedUserId, expectedCourseIds)
    .then(response => assert.deepEqual({}, response, 'Wrong response'));
});
