import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import GoalModel from 'gooru-web/models/goal/goal';

moduleForService('service:api-sdk/goal', 'Unit | Service | api-sdk/goal', {
});

test('createGoal', function(assert) {
  const service = this.subject();
  let goal = GoalModel.create({
    title: "any goal"
  });

  assert.expect(3);

  service.set('serializer', Ember.Object.create({
    serializeCreateGoal: function(goalParam) {
      assert.deepEqual(goalParam, goal, 'Wrong goal parameter');
      return { id: "fake-id" };
    }
  }));

  service.set('adapter', Ember.Object.create({
    createGoal: function(data) {
      assert.deepEqual(data, { id: "fake-id" }, 'Wrong data');
      return Ember.RSVP.resolve(1);
    }
  }));

  var done = assert.async();
  service.createGoal(goal)
    .then(function(goalId) {
      assert.equal(goal.get('id'), goalId, 'Wrong goal id');
      done();
    });
});
