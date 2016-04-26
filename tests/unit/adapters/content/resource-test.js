import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:content/resource', 'Unit | Adapter | content/resource', {
  // needs: []
});

test('createResource', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    body: {}
  };
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/resources', function() {
      return [201, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });
  adapter.createResource(data)
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});

test('readResource', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus/v1/resources/12345', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });

  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.readResource(12345)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('copyResource', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/copier/resources/resource-id', function() {
      return [201, {'Content-Type': 'text/plain', 'Location': 'copy-resource-id'}, ''];
    }, false);
  });
  adapter.copyResource('resource-id')
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});
