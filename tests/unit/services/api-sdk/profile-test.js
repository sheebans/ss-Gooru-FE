import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/profile', 'Unit | Service | api-sdk/profile', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('createProfile', function(assert) {
  const service = this.subject();

  assert.expect(3);

  service.set('profileAdapter', Ember.Object.create({
    createProfile: function(data) {
      const expectedData = {
        body: {}
      };
      assert.deepEqual(expectedData, data, 'Wrong profile data');
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('profileSerializer', Ember.Object.create({
    serializeCreateProfile: function(profileObject) {
      assert.deepEqual({}, profileObject, 'Wrong profile object');
      return {};
    },

    normalizeCreateProfile: function(payload) {
      assert.deepEqual({}, payload, 'Wrong profile payload');
      return {};
    }
  }));

  var done = assert.async();
  service.createProfile({})
    .then(function() {
      done();
    });
});
