import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:content/class', 'Unit | Adapter | content/class', {
  // needs: []
});

test('createClass', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    body: {}
  };
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/classes', function() {
      return [201, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });
  adapter.createClass(data)
    .then(function(response) {
      assert.equal('', response, 'Wrong response');
    });
});

test('getMyClasses', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.get('/api/nucleus/v1/classes', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.getMyClasses()
      .then(function(response) {
        assert.deepEqual({}, response, 'Wrong response');
      });
});
test('readClassInfo', function(assert) {
  const adapter = this.subject();
  const classId = "class-id";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus/v1/classes/class-id', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });
  adapter.readClassInfo(classId)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
