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

test('readMyProfile', function(assert) {
  const service = this.subject();

  assert.expect(2);

  service.set('profileAdapter', Ember.Object.create({
    readMyProfile: function() {
      assert.ok(true, "readMyProfile() function was called" );
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
  service.readMyProfile()
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

test('getCourses', function(assert) {
  const service = this.subject();

  assert.expect(3);

  service.set('profileCourseAdapter', Ember.Object.create({
    getCourses: function(profileId, subject) {
      assert.equal(profileId, 'profile-id', 'Wrong profile id');
      assert.equal(subject, 'course-subject', 'Wrong course subject');
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('courseSerializer', Ember.Object.create({
    normalizeGetCourses: function(coursesPayload) {
      assert.deepEqual({}, coursesPayload, 'Wrong courses payload');
      return {};
    }
  }));

  let profileObject = Ember.Object.create({
    id: 'profile-id'
  });
  var done = assert.async();
  service.getCourses(profileObject, 'course-subject')
    .then(function() {
      done();
    });
});
