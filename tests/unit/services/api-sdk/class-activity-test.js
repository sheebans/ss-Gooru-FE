import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/class-activity', 'Unit | Service | api-sdk/class-activity', {
});

test('addActivityToClass', function(assert) {
  const service = this.subject();

  assert.expect(5);

  service.set('classActivityAdapter', Ember.Object.create({
    addActivityToClass: function(classId, contentId, contentType, context) {
      assert.equal(classId, 123, 'Wrong class id');
      assert.equal(contentId, 321, 'Wrong content id');
      assert.equal(contentType, 'assessment', 'Wrong content type');
      assert.equal(context, 'any context', 'Wrong context');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.addActivityToClass(123, 321, 'assessment', 'any context')
    .then(function(response) {
      assert.ok(response, 'fake-response', 'Wrong response');
      done();
    });
});


test('enableClassActivity', function(assert) {
  const service = this.subject();

  assert.expect(4);

  service.set('classActivityAdapter', Ember.Object.create({
    enableClassActivity: function(classId, contentId, activationDate) {
      assert.equal(classId, 123, 'Wrong class id');
      assert.equal(contentId, 321, 'Wrong content id');
      assert.equal(activationDate, 'any activation date', 'Wrong activation date');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.enableClassActivity(123, 321, 'any activation date')
    .then(function(response) {
      assert.ok(response, 'fake-response', 'Wrong response');
      done();
    });
});

test('findClassActivities', function(assert) {
  assert.expect(7);

  const service = this.subject({
    findClassActivitiesPerformanceSummary: function (userId, classId, classActivities) {
      assert.equal(userId, 321, 'Wrong userId');
      assert.equal(classId, 123, 'Wrong class id');
      assert.deepEqual(classActivities, [1,2,3], 'Wrong class activities');
      return Ember.RSVP.resolve(classActivities);
    }
  });

  service.set('classActivityAdapter', Ember.Object.create({
    findClassActivities: function(classId, contentType) {
      assert.equal(classId, 123, 'Wrong class id');
      assert.equal(contentType, 'any content type', 'Wrong content type');
      return Ember.RSVP.resolve('fake-payload');
    }
  }));

  service.set('classActivitySerializer', Ember.Object.create({
    normalizeFindClassActivities: function(payload) {
      assert.equal(payload, 'fake-payload', 'Wrong payload');
      return [1,2,3];
    }
  }));

  var done = assert.async();
  service.findClassActivities(321, 123, 'any content type')
    .then(function(response) {
      assert.deepEqual(response, [1,2,3], 'Wrong response');
      done();
    });
});

test('findClassActivitiesPerformanceSummary', function(assert) {
  assert.expect(8);

  const service = this.subject();

  service.set('performanceService', Ember.Object.create({
    findCollectionPerformanceSummaryByIds: function(userId, collectionIds, collectionType, classId) {
      //this method is called twice, one for assessment and one for collection
      assert.equal(userId, 321, 'Wrong user id');
      assert.equal(classId, 123, 'Wrong class id');
      let performanceItems = [];
      if (collectionType === 'assessment') {
        assert.deepEqual(collectionIds, [1, 2], 'Wrong assessment ids');
        performanceItems = [ //collection performance summary items
          Ember.Object.create({ collectionId : 1, score: 100}),
          Ember.Object.create({ collectionId : 2, score: 50})
        ];
      }
      else {
        assert.deepEqual(collectionIds, [3], 'Wrong collection ids');
        performanceItems = [ //collection performance summary items
          Ember.Object.create({ collectionId : 3, score: 25})
        ];
      }
      return Ember.RSVP.resolve(performanceItems);
    }
  }));

  const classActivities = [
    Ember.Object.create({
      collection: Ember.Object.create({ isAssessment: true, id: 1 })
    }),
    Ember.Object.create({
      collection: Ember.Object.create({ isAssessment: true, id: 2 })
    }),
    Ember.Object.create({
      collection: Ember.Object.create({ isCollection: true, id: 3 })
    })
  ];
  var done = assert.async();
  service.findClassActivitiesPerformanceSummary(321, 123, classActivities)
    .then(function(response) {
      const classActivity = response[0];
      assert.ok(classActivity.get('collectionPerformanceSummary'), 'Missing collection performance summary');
      assert.equal(classActivity.get('collectionPerformanceSummary.score'), 100, 'Wrong score');
      done();
    });
});
