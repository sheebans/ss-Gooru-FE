import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/authentication', 'Unit | Service | api-sdk/authentication', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('authenticateAsAnonymous', function(assert) {
  const service = this.subject();
  const response = {};

  assert.expect(2);

  service.set('authenticationAdapter', Ember.Object.create({
    postAuthentication: function(data) {
      assert.equal(true, data.isAnonymous, 'Wrong isAnonymous status');
      return Ember.RSVP.resolve(response);
    }
  }));

  service.set('authenticationSerializer', Ember.Object.create({
    normalizeResponse: function(payload) {
      assert.deepEqual(response, payload, 'Wrong response payload');
      return {};
    }
  }));

  var done = assert.async();
  service.authenticateAsAnonymous()
    .then(function() {
      done();
    });
});

test('authenticateWithCredentials', function(assert) {
  const service = this.subject();
  const response = {};
  const expectedData = {
    isAnonymous: false,
    username: 'username',
    password: 'password'
  };
  const sessionData = {
    user: {
      gooruUId: 'user-id'
    }
  };
  const expectedProfile = {
    avatarUrl: 'image-id'
  };

  assert.expect(5);

  service.set('authenticationAdapter', Ember.Object.create({
    postAuthentication: function(data) {
      assert.deepEqual(expectedData, data, 'Wrong authentication data');
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('profileAdapter', Ember.Object.create({
    readUserProfile: function(userId) {
      assert.deepEqual(userId, 'user-id', 'Wrong user id');
      return Ember.RSVP.resolve(expectedProfile);
    }
  }));

  service.set('authenticationSerializer', Ember.Object.create({
    normalizeResponse: function(payload) {
      assert.deepEqual({}, payload, 'Wrong response payload');
      return sessionData;
    },

    normalizeAvatarUrl: function(payload, session) {
      assert.deepEqual(expectedProfile, payload, 'Wrong response payload');
      assert.deepEqual(sessionData, session, 'Wrong session data');
      return {};
    }
  }));

  var done = assert.async();
  service.authenticateWithCredentials('username', 'password')
    .then(function() {
      done();
    });
});

test('authenticateWithToken', function(assert) {
  const service = this.subject();
  const expectedData = {
    accessToken: 'access_token'
  };
  const sessionData = {
    user: {
      gooruUId: 'user-id'
    }
  };
  const expectedProfile = {
    avatarUrl: 'image-id'
  };
  assert.expect(5);

  service.set('authenticationAdapter', Ember.Object.create({
    postAuthenticationWithToken: function(data) {
      assert.deepEqual(expectedData, data, 'Wrong authentication data');
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('profileAdapter', Ember.Object.create({
    readUserProfile: function(userId) {
      assert.deepEqual(userId, 'user-id', 'Wrong user id');
      return Ember.RSVP.resolve(expectedProfile);
    }
  }));

  service.set('authenticationSerializer', Ember.Object.create({
    normalizeResponse: function(payload) {
      assert.deepEqual({}, payload, 'Wrong response payload');
      return sessionData;
    },

    normalizeAvatarUrl: function(payload, session) {
      assert.deepEqual(expectedProfile, payload, 'Wrong response payload');
      assert.deepEqual(sessionData, session, 'Wrong session data');
      return {};
    }
  }));

  var done = assert.async();
  service.authenticateWithToken('access_token')
    .then(function() {
      done();
    });
});
