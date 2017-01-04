import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/analytics', 'Unit | Service | api-sdk/analytics', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('findResourcesByCollection', function(assert) {
  const service = this.subject();
  const response = {
    'content':[
      {
        'userUId':'602fee94-50cf-4a8b-af2b-6b73e0319bab',
        'usageData':[
          {
            'gooruOId': '46d4a6d4-991b-4c51-a656-f694e037dd68',
            'views': 1,
            'score': 1,
            'reaction': 5,
            'timeSpent': 3600000,
            'resourceType': 'question',
            'questionType': 'MC',
            'answerObject': 'NA'
          }
        ]
      }
    ],
    'message': null,
    'paginate': null
  };

  assert.expect(2);

  service.set('analyticsAdapter', Ember.Object.create({
    queryRecord: function(query) {
      assert.deepEqual(query, {
        classId: 'the-class-id',
        courseId: 'the-course-id',
        unitId: 'the-unit-id',
        lessonId: 'the-lesson-id',
        collectionId: 'the-collection-id',
        collectionType: 'the-collection-type'
      });
      return Ember.RSVP.resolve(response);
    }
  }));

  service.set('analyticsSerializer', Ember.Object.create({
    normalizeResponse: function(payload) {
      assert.deepEqual(payload, response);
      return [];
    }
  }));

  var done = assert.async();
  service.findResourcesByCollection('the-class-id', 'the-course-id', 'the-unit-id', 'the-lesson-id', 'the-collection-id', 'the-collection-type')
    .then(function() {
      done();
    });
});

test('getStandardsSummary', function(assert) {
  const service = this.subject();
  assert.expect(3);

  service.set('analyticsAdapter', Ember.Object.create({
    getStandardsSummary: function(sessionId, userId) {
      assert.equal(sessionId, 12345, 'wrong session id');
      assert.equal(userId, 123, 'wrong user id');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('analyticsSerializer', Ember.Object.create({
    normalizeGetStandardsSummary: function(payload) {
      assert.equal(payload, 'fake response', 'wrong payload, should match adapter response');
      return [];
    }
  }));

  var done = assert.async();
  service.getStandardsSummary(12345, 123)
    .then(function() {
      done();
    });
});


test('getUserCurrentLocation fetchAll-default-value', function(assert) {
  const service = this.subject();
  assert.expect(3);

  service.set('currentLocationAdapter', Ember.Object.create({
    getUserCurrentLocation: function(classId, userId) {
      assert.equal(classId, 345, 'wrong class id');
      assert.equal(userId, 123, 'wrong user id');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('currentLocationSerializer', Ember.Object.create({
    normalizeCurrentLocation: function(payload) {
      assert.equal(payload, 'fake response', 'wrong payload, should match adapter response');
      return Ember.Object.create({
        courseId: "courseId",
        unitId: "unitId",
        lessonId: "lessonId"
      });
    }
  }));

  service.set('courseService', Ember.Object.create({
    fetchById: function() {
      assert.ok(false, 'This should not be called');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('unitService', Ember.Object.create({
    fetchById: function() {
      assert.ok(false, 'This should not be called');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('lessonService', Ember.Object.create({
    fetchById: function() {
      assert.ok(false, '');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  var done = assert.async();
  service.getUserCurrentLocation(345, 123)
    .then(function() {
      done();
    });
});

test('getUserCurrentLocation fetchAll-true currentLocation-null', function(assert) {
  const service = this.subject();
  assert.expect(3);

  service.set('currentLocationAdapter', Ember.Object.create({
    getUserCurrentLocation: function(classId, userId) {
      assert.equal(classId, 345, 'wrong class id');
      assert.equal(userId, 123, 'wrong user id');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('currentLocationSerializer', Ember.Object.create({
    normalizeCurrentLocation: function(payload) {
      assert.equal(payload, 'fake response', 'wrong payload, should match adapter response');
      return null;
    }
  }));

  service.set('courseService', Ember.Object.create({
    fetchById: function() {
      assert.ok(false, 'This should not be called');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('unitService', Ember.Object.create({
    fetchById: function() {
      assert.ok(false, 'This should not be called');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('lessonService', Ember.Object.create({
    fetchById: function() {
      assert.ok(false, '');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  var done = assert.async();
  service.getUserCurrentLocation(345, 123, true)
    .then(function() {
      done();
    });
});

test('getUserCurrentLocation fetchAll-true', function(assert) {
  const service = this.subject();
  assert.expect(9);

  service.set('currentLocationAdapter', Ember.Object.create({
    getUserCurrentLocation: function(classId, userId) {
      assert.equal(classId, 345, 'wrong class id');
      assert.equal(userId, 123, 'wrong user id');
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('currentLocationSerializer', Ember.Object.create({
    normalizeCurrentLocation: function(payload) {
      assert.equal(payload, 'fake response', 'wrong payload, should match adapter response');
      return Ember.Object.create({
        courseId: "courseId",
        unitId: "unitId",
        lessonId: "lessonId"
      });
    }
  }));

  service.set('courseService', Ember.Object.create({
    fetchById: function(courseId) {
      assert.equal(courseId, "courseId", "wrong course id");
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('unitService', Ember.Object.create({
    fetchById: function(courseId, unitId) {
      assert.equal(courseId, "courseId", "wrong course id");
      assert.equal(unitId, "unitId", "wrong unit id");
      return Ember.RSVP.resolve('fake response');
    }
  }));

  service.set('lessonService', Ember.Object.create({
    fetchById: function(courseId, unitId, lessonId) {
      assert.equal(courseId, "courseId", "wrong course id");
      assert.equal(unitId, "unitId", "wrong unit id");
      assert.equal(lessonId, "lessonId", "wrong lesson id");
      return Ember.RSVP.resolve('fake response');
    }
  }));

  var done = assert.async();
  service.getUserCurrentLocation(345, 123, true)
    .then(function() {
      done();
    });
});
