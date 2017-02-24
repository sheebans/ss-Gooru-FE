import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';
import SuggestContext from 'gooru-web/models/suggest/suggest-context';

const sessionStub = Ember.Service.extend({
  "token-api3": 'token-api-3'
});

moduleForAdapter('adapter:suggest/suggest', 'Unit | Adapter | suggest/suggest', {
  unit: true,
  beforeEach: function () {
    this.register('service:session', sessionStub);
    this.inject.service('session');
  }
});

test('suggestResourcesForCollection no course information', function (assert) {
  assert.expect(11);
  // Mock backend response
  this.pretender.map(function () {
    this.post('/gooru-search/rest/v3/suggest/resource', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(request.queryParams.limit, 10, 'Wrong limit');
      assert.equal(requestBodyJson.context.contextType, "collection-study", "Wrong context type");
      assert.equal(requestBodyJson.context.containerId, "container-id-1", "Wrong container id");
      assert.equal(requestBodyJson.context.userId, "user-id-1", "Wrong user id");
      assert.ok(!requestBodyJson.context.courseId, "Should have no course id");
      assert.ok(!requestBodyJson.context.unitId, "Should have no unit id");
      assert.ok(!requestBodyJson.context.lessonId, "Should have no lesson id");
      assert.equal(requestBodyJson.metrics.score, 10, "Wrong score");
      assert.equal(requestBodyJson.metrics.timespent, 100, "Wrong time spent");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [200, { 'Content-Type': 'text/plain' }, JSON.stringify('fakeResponse')];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.suggestResourcesForCollection(SuggestContext.create({
    containerId: 'container-id-1',
    userId: 'user-id-1',
    score: 10,
    timeSpent: 100
  })).then(function (response) {
      assert.equal(response, 'fakeResponse', 'Wrong response');
    });
});

test('suggestResourcesForCollection with course information', function (assert) {
  assert.expect(11);
  // Mock backend response
  this.pretender.map(function () {
    this.post('/gooru-search/rest/v3/suggest/resource', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(request.queryParams.limit, 10, 'Wrong limit');
      assert.equal(requestBodyJson.context.contextType, "collection-study", "Wrong context type");
      assert.equal(requestBodyJson.context.containerId, "container-id-1", "Wrong container id");
      assert.equal(requestBodyJson.context.userId, "user-id-1", "Wrong user id");
      assert.equal(requestBodyJson.context.courseId, "course-id-1", "Wrong course id");
      assert.equal(requestBodyJson.context.unitId, "unit-id-1", "Wrong unit id");
      assert.equal(requestBodyJson.context.lessonId, "lesson-id-1", "Wrong lesson id");
      assert.equal(requestBodyJson.metrics.score, 10, "Wrong score");
      assert.equal(requestBodyJson.metrics.timespent, 100, "Wrong time spent");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify('fakeResponse')];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.suggestResourcesForCollection(SuggestContext.create({
    containerId: 'container-id-1',
    userId: 'user-id-1',
    courseId: 'course-id-1',
    unitId: 'unit-id-1',
    lessonId: 'lesson-id-1',
    score: 10,
    timeSpent: 100
  })).then(function (response) {
      assert.equal(response, 'fakeResponse', 'Wrong response');
    });
});

test('suggestResourcesForResource no course information', function (assert) {
  assert.expect(10);
  // Mock backend response
  this.pretender.map(function () {
    this.get('/gooru-search/rest/v3/suggest/resource', function (request) {
      assert.equal(request.queryParams.limit, 10, 'Wrong limit');
      assert.equal(request.queryParams.contextType, "resource-study-suggest", "Wrong context type");
      assert.equal(request.queryParams.resourceId, "resource-id-1", "Wrong resource id");
      assert.equal(request.queryParams.userId, "user-id-1", "Wrong user id");
      assert.ok(!request.queryParams.containerId, "Should have no container id");
      assert.ok(!request.queryParams.courseId, "Should have no course id");
      assert.ok(!request.queryParams.unitId, "Should have no unit id");
      assert.ok(!request.queryParams.lessonId, "Should have no lesson id");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [200, { 'Content-Type': 'text/plain' }, JSON.stringify('fakeResponse')];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.suggestResourcesForResource('resource-id-1', SuggestContext.create({
    userId: 'user-id-1'
  })).then(function (response) {
      assert.equal(response, 'fakeResponse', 'Wrong response');
    });
});

test('suggestResourcesForResource with course information', function (assert) {
  assert.expect(10);
  // Mock backend response
  this.pretender.map(function () {
    this.get('/gooru-search/rest/v3/suggest/resource', function (request) {
      assert.equal(request.queryParams.limit, 10, 'Wrong limit');
      assert.equal(request.queryParams.contextType, "resource-study-suggest", "Wrong context type");
      assert.equal(request.queryParams.resourceId, "resource-id-1", "Wrong resource id");
      assert.equal(request.queryParams.containerId, "container-id-1", "Wrong container id");
      assert.equal(request.queryParams.userId, "user-id-1", "Wrong user id");
      assert.equal(request.queryParams.courseId, "course-id-1", "Wrong course id");
      assert.equal(request.queryParams.unitId, "unit-id-1", "Wrong unit id");
      assert.equal(request.queryParams.lessonId, "lesson-id-1", "Wrong lesson id");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify('fakeResponse')];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.suggestResourcesForResource('resource-id-1', SuggestContext.create({
    containerId: 'container-id-1',
    userId: 'user-id-1',
    courseId: 'course-id-1',
    unitId: 'unit-id-1',
    lessonId: 'lesson-id-1'
  })).then(function (response) {
      assert.equal(response, 'fakeResponse', 'Wrong response');
    });
});
