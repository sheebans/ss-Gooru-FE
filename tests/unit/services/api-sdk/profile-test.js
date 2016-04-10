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

test('updateMyProfile', function(assert) {
  const service = this.subject();

  assert.expect(2);

  service.set('profileAdapter', Ember.Object.create({
    updateMyProfile: function(data) {
      const expectedData = {
        body: {}
      };
      assert.deepEqual(expectedData, data, 'Wrong profile data');
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('profileSerializer', Ember.Object.create({
    serializeUpdateProfile: function(profileObject) {
      assert.deepEqual({}, profileObject, 'Wrong profile object');
      return {};
    }
  }));

  var done = assert.async();
  service.updateMyProfile({})
    .then(function() {
      done();
    });
});

test('readUserProfile', function(assert) {
  const service = this.subject();
  assert.expect(2);

  service.set('profileAdapter', Ember.Object.create({
    readUserProfile: function() {
      assert.ok(true, "readUserProfile() function was called" );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('profileSerializer', Ember.Object.create({
    normalizeReadProfile: function(profilePayload) {
      assert.deepEqual({}, profilePayload, 'Wrong profile payload');
      return {};
    }
  }));

  var done = assert.async();
  service.readUserProfile()
    .then(function() {
      done();
    });
});

test('followUserProfile', function(assert) {
  const service = this.subject();
  assert.expect(1);

  service.set('profileAdapter', Ember.Object.create({
    followUserProfile: function() {
      assert.ok(true, "followUserProfile() function was called" );
      return Ember.RSVP.resolve({});
    }
  }));

  var done = assert.async();
  service.followUserProfile()
    .then(function() {
      done();
    });
});

test('unfollowUserProfile', function(assert) {
  const service = this.subject();
  assert.expect(1);

  service.set('profileAdapter', Ember.Object.create({
    unfollowUserProfile: function() {
      assert.ok(true, "unfollowUserProfile() function was called" );
      return Ember.RSVP.resolve({});
    }
  }));

  var done = assert.async();
  service.unfollowUserProfile()
    .then(function() {
      done();
    });
});

test('readResources', function(assert) {
  const service = this.subject();
  assert.expect(2);

  service.set('profileAdapter', Ember.Object.create({
    readResources: function(userId) {
      assert.equal(userId, 1, "readResources(1) function was called" );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('profileSerializer', Ember.Object.create({
    normalizeReadResources: function(response) {
      assert.deepEqual(response, {}, "normalizeReadResources() function was called" );
      return [];
    }
  }));

  var done = assert.async();
  service.readResources(1).then(function() { done(); });
});
