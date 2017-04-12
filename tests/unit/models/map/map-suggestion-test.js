import { ASSESSMENT_SUB_TYPES } from 'gooru-web/config/config';
import { moduleFor, test } from 'ember-qunit';

moduleFor('model:map/map-suggestion', 'Unit | Model | map/map-suggestion', {
  unit: true
});

test('isPreTest', function (assert) {
  var model = this.subject({
    type: ASSESSMENT_SUB_TYPES.PRE_TEST
  });

  assert.ok(model.get("isPreTest"), "Should be pretest");
});

test('isPostTest', function (assert) {
  var model = this.subject({
    type: ASSESSMENT_SUB_TYPES.POST_TEST
  });

  assert.ok(model.get("isPostTest"), "Should be post test");
});
test('isBenchmark', function (assert) {
  var model = this.subject({
    type: ASSESSMENT_SUB_TYPES.BENCHMARK
  });

  assert.ok(model.get("isBenchmark"), "Should be benchmark");
});

test('is not pre-test, post-test or benchmark', function (assert) {
  var model = this.subject({
    type: 'any'
  });

  assert.ok(!model.get("isPreTest"), "Should not be pre test");
  assert.ok(!model.get("isPostTest"), "Should not be post test");
  assert.ok(!model.get("isBenchmark"), "Should not be benchmark");
});
