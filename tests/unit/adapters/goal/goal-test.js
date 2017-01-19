import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

const sessionStub = Ember.Service.extend({
  "token-api3": 'token-api-3'
});

moduleForAdapter('adapter:goal/goal', 'Unit | Adapter | goal/goal', {
  unit: true,
  beforeEach: function () {
    this.register('service:session', sessionStub);
    this.inject.service('session');
  }
});

test('Unit creation, success', function (assert) {
  assert.expect(3);
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v1/goals', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson["title"], "any content", "Wrong title");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [
        201,
        {
          'Content-Type': 'text/plain',
          'location': 'goal-id-456'
        },
        ''];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();
  const params = { title: "any content" };

  adapter.createGoal(params)
    .then(function (response) {
      assert.equal(response, 'goal-id-456', 'Should respond with the newly created ID for the goal');
    });
});

test('Unit creation, failure', function (assert) {
  assert.expect(3);
  // Mock backend response
  this.pretender.map(function () {
    this.post('/api/nucleus/v1/goals', function (request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal(requestBodyJson["title"], "any content", "Wrong title");
      assert.equal(request.requestHeaders['Authorization'], "Token token-api-3", "Wrong token");
      return [ 500, {'Content-Type': 'text/plain'},''];
    });
  });
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  const adapter = this.subject();
  const params = { title: "any content" };

  adapter.createGoal(params)
    .catch(function (response) {
      assert.equal(response.status, '500', 'Error code');
    });
});
