import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:lookup/lookup', 'Unit | Adapter | lookup/lookup', {
  // needs: []
});


test('readCountries', function(assert) {
  const adapter = this.subject();
  const keyword = "any-keyword";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.get('/api/nucleus/v1/lookups/countries', function(request) {
      assert.equal(request.queryParams.keyword, 'any-keyword', "Missing query param");
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.readCountries(keyword)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('readStates', function(assert) {
  const adapter = this.subject();
  const keyword = "any-keyword";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.get('/api/nucleus/v1/lookups/countries/1/states', function(request) {
      assert.equal(request.queryParams.keyword, 'any-keyword', "Missing query param");
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.readStates(1, keyword)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
