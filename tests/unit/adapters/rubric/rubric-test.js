import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

const sessionStub = Ember.Service.extend({
  "token-api3": 'token-api-3'
});

moduleForAdapter('adapter:rubric/rubric', 'Unit | Adapter | rubric/rubric', {
  unit: true,
  beforeEach: function () {
    this.register('service:session', sessionStub);
    this.inject.service('session');
  }
});

test('Rubric creation, success', function (assert) {
  assert.expect(3);
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v2/rubrics', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson["title"], "any content", "Wrong title");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        201,
        {
          'Content-Type': 'text/plain',
          'location': 'rubric-id-456'
        },
        ''];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();
  const params = { title: "any content" };

  adapter.createRubric(params)
    .then(function (response) {
      assert.equal(response, 'rubric-id-456', 'Should respond with the newly created ID for the rubric');
    });
});

test('Rubric update, success', function (assert) {
  assert.expect(3);
  // Mock backend response
  this.pretender.map(function () {
    this.put('/api/nucleus/v2/rubrics/123', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson["title"], "any content", "Wrong title");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        201,
        {
          'Content-Type': 'text/plain'
        },
        ''];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();
  const params = {
    title: "any content"
  };
  const rubricId = 123;

  adapter.updateRubric(params, rubricId)
    .then(function (response) {
      assert.ok(response, 'Should return true');
    });
});

test('Rubric delete, success', function (assert) {
  assert.expect(2);
  // Mock backend response
  this.pretender.map(function () {
    this.delete('/api/nucleus/v2/rubrics/123', function (request) {
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        200,
        {
          'Content-Type': 'text/plain'
        },
        ''];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.deleteRubric(123)
    .then(function (response) {
      assert.ok(response, 'Should return true');
    });
});

test('getRubric', function (assert) {
  assert.expect(2);
  const fakeResponse = "fakeResponse";

  // Mock backend response
  this.pretender.map(function () {
    this.get('/api/nucleus/v2/rubrics/123', function (request) {
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        200,
        {
          'Content-Type': 'application/json; charset=utf-8'
        },
        JSON.stringify(fakeResponse)];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.getRubric(123).then(function (response) {
    assert.equal(response, fakeResponse, 'Wrong response');
  });
});

test('getUserRubrics', function (assert) {
  assert.expect(2);
  const fakeResponse = "fakeResponse";

  // Mock backend response
  this.pretender.map(function () {
    this.get('/api/nucleus/v2/profiles/123/rubrics', function (request) {
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        200,
        {
          'Content-Type': 'application/json; charset=utf-8'
        },
        JSON.stringify(fakeResponse)];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.getUserRubrics(123).then(function (response) {
    assert.equal(response, fakeResponse, 'Wrong response');
  });
});

test('Rubric copy, success', function (assert) {
  assert.expect(3);
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v2/copier/rubrics/123', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.deepEqual(requestBodyJson, {}, "Missing empty body");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        201,
        {
          'Content-Type': 'text/plain',
          'location': 'rubric-id-456'
        },
        ''];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.copyRubric(123)
    .then(function (response) {
      assert.equal(response, 'rubric-id-456', 'Should respond with the copied ID for the rubric');
    });
});

test('Associate rubric with question, success', function (assert) {
  assert.expect(3);
  // Mock backend response
  this.pretender.map(function () {
    this.put('/api/nucleus/v2/questions/321/rubrics/123', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.deepEqual(requestBodyJson, {}, "Missing empty body");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        204,
        {
          'Content-Type': 'text/plain'
        },
        ''];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();

  adapter.associateRubricToQuestion(123, 321)
    .then(() => assert.ok(true));
});
