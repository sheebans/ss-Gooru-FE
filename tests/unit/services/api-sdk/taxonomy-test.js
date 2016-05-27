import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/taxonomy', 'Unit | Service | api-sdk/taxonomy', {
  // needs: ['serializer:foo']
});

test('fetchSubjects', function(assert) {
  const service = this.subject();

  assert.expect(2);

  service.set('taxonomyAdapter', Ember.Object.create({
    fetchSubjects: function(type) {
      assert.deepEqual(type, 'k_12', 'Wrong profile data');
      return Ember.RSVP.resolve([]);
    }
  }));

  service.set('taxonomySerializer', Ember.Object.create({
    normalizeFetchSubjects: function(subjectsPayload) {
      assert.deepEqual(subjectsPayload, [], 'Wrong subjects payload');
      return [];
    }
  }));

  var done = assert.async();
  service.fetchSubjects('k_12')
    .then(function() {
      done();
    });
});

