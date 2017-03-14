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
  const service = this.subject();

  assert.expect(4);

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
      return Ember.RSVP.resolve([]);
    }
  }));

  var done = assert.async();
  service.findClassActivities(123, 'any content type')
    .then(function(response) {
      assert.ok(response, 'fake-response', 'Wrong response');
      done();
    });
});
