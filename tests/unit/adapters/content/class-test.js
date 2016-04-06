import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:content/class', 'Unit | Adapter | content/class', {
  // needs: []
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
