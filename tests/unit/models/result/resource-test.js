import ResourceResult from 'gooru-web/models/result/resource';
import { module, test } from 'qunit';

module('Unit | Model | result/resource');


test('Change submittedAt', function(assert) {
  let resourceResult = ResourceResult.create({
    timeSpent: 99999,
    startedAt: new Date("October 13, 2014 11:40:00")
  });

  assert.equal(resourceResult.get("timeSpent"), 0, "Wrong initial time spent");

  resourceResult.set("submittedAt", new Date("October 13, 2014 11:41:00"));
  assert.equal(resourceResult.get("timeSpent"), 60, "Wrong new time spent");

  resourceResult.set("submittedAt", null);
  assert.equal(resourceResult.get("timeSpent"), 0, "Wrong time spent, should be 0");
});

test('Change startedAt', function(assert) {
  let resourceResult = ResourceResult.create({
    timeSpent: 99999,
    startedAt: new Date("October 13, 2014 11:40:00"),
    submittedAt: new Date("October 13, 2014 11:41:00")
  });

  assert.equal(resourceResult.get("timeSpent"), 60, "Wrong initial time spent");

  resourceResult.set("startedAt", new Date("October 13, 2014 11:41:00"));
  assert.equal(resourceResult.get("submittedAt"), null, "SubmittedAt should be null");
  assert.equal(resourceResult.get("timeSpent"), 0, "Time spent should be 0");
});
