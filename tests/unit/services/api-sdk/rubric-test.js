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

