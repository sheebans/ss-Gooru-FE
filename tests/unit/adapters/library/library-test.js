import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:library/library', 'Unit | Adapter | library/library', {
  // needs: []
});

test('fetchLibraries', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  this.pretender.map(function() {
    this.get('/api/nucleus/v2/libraries', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  });

  adapter.fetchLibraries()
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
