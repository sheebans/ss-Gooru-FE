import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:class/class', 'Unit | Adapter | class/class', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('urlForQueryRecord querying for classes as student', function (assert) {
  let adapter = this.subject();

  const
    query = {
      isStudent: true
    },
    url = adapter.urlForQueryRecord(query);

  assert.equal(url, "/gooruapi/rest/v3/class/study", "Wrong url");
});

test('urlForQueryRecord querying for classes as teacher', function (assert) {
  let adapter = this.subject();

  const
    query = {},
    url = adapter.urlForQueryRecord(query);

  assert.equal(url, "/gooruapi/rest/v3/class/teach", "Wrong url");
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
