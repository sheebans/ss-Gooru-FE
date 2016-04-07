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
