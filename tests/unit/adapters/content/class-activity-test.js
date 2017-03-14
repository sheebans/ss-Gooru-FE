import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:content/class-activity', 'Unit | Adapter | content/class-activity', {
  // needs: []
});

test('addActivityToClass with no context', function(assert) {
  assert.expect(9);

  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.post('/api/nucleus/v2/classes/123/contents', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson.class_id, 123, 'Wrong class id');
      assert.equal(requestBodyJson.content_id, 321, 'Wrong content id');
      assert.equal(requestBodyJson.content_type, 'assessment', 'Wrong content type');
      assert.ok(!requestBodyJson.ctx_course_id, 'ctx_course_id should be undefined');
      assert.ok(!requestBodyJson.ctx_unit_id, 'ctx_unit_id should be undefined');
      assert.ok(!requestBodyJson.ctx_lesson_id, 'ctx_lesson_id should be undefined');
      assert.ok(!requestBodyJson.ctx_collection_id, 'ctx_collection_id should be undefined');
      assert.equal(request.requestHeaders['Authorization'], 'Token token-api-3', 'Wrong token');
      return [201, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });
  adapter.addActivityToClass(123, 321, 'assessment')
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});

test('addActivityToClass with context', function(assert) {
  assert.expect(9);

  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.post('/api/nucleus/v2/classes/123/contents', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson.class_id, 123, 'Wrong class id');
      assert.equal(requestBodyJson.content_id, 321, 'Wrong content id');
      assert.equal(requestBodyJson.content_type, 'assessment', 'Wrong content type');
      assert.equal(requestBodyJson.ctx_course_id, 10, 'ctx_course_id should be 10');
      assert.equal(requestBodyJson.ctx_unit_id, 20, 'ctx_unit_id should be 20');
      assert.equal(requestBodyJson.ctx_lesson_id, 30, 'ctx_lesson_id should be 30');
      assert.equal(requestBodyJson.ctx_collection_id, 40, 'ctx_collection_id should be 40');
      assert.equal(request.requestHeaders['Authorization'], 'Token token-api-3', 'Wrong token');
      return [201, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });
  adapter.addActivityToClass(123, 321, 'assessment', {
    courseId: 10,
    unitId: 20,
    lessonId: 30,
    collectionId: 40
  })
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});

test('enableClassActivity with date', function(assert) {
  assert.expect(3);

  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.put('/api/nucleus/v2/classes/123/contents/321', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson.activation_date, '2012-11-13', 'Wrong activation date');
      assert.equal(request.requestHeaders['Authorization'], 'Token token-api-3', 'Wrong token');
      return [201, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });
  const november = (11 - 1);
  adapter.enableClassActivity(123, 321, new Date(2012, november, 13))
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});

test('findClassActivities with no content type', function(assert) {
  assert.expect(3);

  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus/v2/classes/123/contents', function(request) {
      assert.ok(!request.queryParams.content_type, 'Content type should be undefined');
      assert.equal(request.requestHeaders['Authorization'], 'Token token-api-3', 'Wrong token');
      return [201, {'Content-Type': 'application/json'}, JSON.stringify('fake-response')];
    }, false);
  });
  adapter.findClassActivities(123)
    .then(function(response) {
      assert.equal('fake-response', response, 'Wrong response');
    });
});

test('findClassActivities with content type', function(assert) {
  assert.expect(3);

  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus/v2/classes/123/contents', function(request) {
      assert.equal(request.queryParams.content_type, 'assessment', 'Content type should be assessment');
      assert.equal(request.requestHeaders['Authorization'], 'Token token-api-3', 'Wrong token');
      return [201, {'Content-Type': 'application/json'}, JSON.stringify('fake-response')];
    }, false);
  });
  adapter.findClassActivities(123, 'assessment')
    .then(function(response) {
      assert.equal('fake-response', response, 'Wrong response');
    });
});

