import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import RubricModel from 'gooru-web/models/rubric/rubric';

moduleForService('service:api-sdk/rubric', 'Unit | Service | api-sdk/rubric', {
});

test('createRubric', function(assert) {
  const service = this.subject();
  let rubric = RubricModel.create({
    title: "any rubric"
  });

  assert.expect(3);

  service.set('serializer', Ember.Object.create({
    serializeCreateRubric: function(rubricParam) {
      assert.deepEqual(rubricParam, rubric, 'Wrong rubric parameter');
      return { id: "fake-id" };
    }
  }));

  service.set('adapter', Ember.Object.create({
    createRubric: function(data) {
      assert.deepEqual(data, { id: "fake-id" }, 'Wrong data');
      return Ember.RSVP.resolve(1);
    }
  }));

  var done = assert.async();
  service.createRubric(rubric)
    .then(function(rubricId) {
      assert.equal(rubric.get('id'), rubricId, 'Wrong rubric id');
      done();
    });
});

test('updateRubric', function(assert) {
  const service = this.subject();
  let rubric = RubricModel.create({
    id: 123,
    title: "any rubric"
  });

  assert.expect(4);

  service.set('serializer', Ember.Object.create({
    serializeUpdateRubric: function(rubricParam) {
      assert.deepEqual(rubricParam, rubric, 'Wrong rubric parameter');
      return { id: "fake-id" };
    }
  }));

  service.set('adapter', Ember.Object.create({
    updateRubric: function(data, rubricId) {
      assert.equal(rubricId, 123, 'Wrong rubric id');
      assert.deepEqual(data, { id: "fake-id" }, 'Wrong data');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.updateRubric(rubric)
    .then(function(updated) {
      assert.ok(updated, 'Wrong updated');
      done();
    });
});


test('deleteRubric', function(assert) {
  const service = this.subject();
  assert.expect(2);

  service.set('adapter', Ember.Object.create({
    deleteRubric: function(rubricId) {
      assert.deepEqual(rubricId, 123, 'Wrong id');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.deleteRubric(123)
    .then(function(deleted) {
      assert.ok(deleted, 'Wrong response');
      done();
    });
});


test('getRubric', function(assert) {
  const service = this.subject();
  assert.expect(3);


  service.set('serializer', Ember.Object.create({
    normalizeRubric: function(data) {
      assert.equal(data, 'fake-data', 'Wrong data');
      return 'fake-response';
    }
  }));

  service.set('adapter', Ember.Object.create({
    getRubric: function(rubricId) {
      assert.deepEqual(rubricId, 123, 'Wrong id');
      return Ember.RSVP.resolve('fake-data');
    }
  }));

  var done = assert.async();
  service.getRubric(123)
    .then(function(response) {
      assert.equal(response, 'fake-response', 'Wrong response');
      done();
    });
});


test('getUserRubrics', function(assert) {
  const service = this.subject();
  assert.expect(3);


  service.set('serializer', Ember.Object.create({
    normalizeGetRubrics: function(data) {
      assert.equal(data, 'fake-data', 'Wrong data');
      return 'fake-response';
    }
  }));

  service.set('adapter', Ember.Object.create({
    getUserRubrics: function(userId) {
      assert.deepEqual(userId, 123, 'Wrong id');
      return Ember.RSVP.resolve('fake-data');
    }
  }));

  var done = assert.async();
  service.getUserRubrics(123)
    .then(function(response) {
      assert.equal(response, 'fake-response', 'Wrong response');
      done();
    });
});


test('copyRubric', function(assert) {
  const service = this.subject();
  assert.expect(2);

  service.set('adapter', Ember.Object.create({
    copyRubric: function(rubricId) {
      assert.equal(rubricId, 123, 'Wrong id');
      return Ember.RSVP.resolve(12345);
    }
  }));

  var done = assert.async();
  service.copyRubric(123)
    .then(function(copiedId) {
      assert.equal(copiedId, 12345, 'Wrong response');
      done();
    });
});


test('associateRubricToQuestion', function(assert) {
  const service = this.subject();
  assert.expect(3);

  service.set('adapter', Ember.Object.create({
    associateRubricToQuestion: function(rubricId, questionId) {
      assert.equal(rubricId, 123, 'Wrong id');
      assert.equal(questionId, 312, 'Wrong question id');
      return Ember.RSVP.resolve(true);
    }
  }));

  var done = assert.async();
  service.associateRubricToQuestion(123, 312)
    .then(function(associated) {
      assert.equal(associated, true, 'Wrong response');
      done();
    });
});


