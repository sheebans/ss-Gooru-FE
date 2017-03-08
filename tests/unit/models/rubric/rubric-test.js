import { RUBRIC_TYPE } from 'gooru-web/config/config';
import { moduleFor, test } from 'ember-qunit';

moduleFor('model:rubric/rubric', 'Unit | Model | rubric/rubric', {
  unit: true
});

test('is1xN', function (assert) {
  var model = this.subject({
    type: RUBRIC_TYPE._1xN
  });

  assert.ok(model.get("is1xN"), "wrong type");
  assert.ok(!model.get("isNxN"), "wrong type");
});

test('isNxN', function (assert) {
  var model = this.subject({
    type: RUBRIC_TYPE.NxN
  });

  assert.ok(model.get("isNxN"), "wrong type");
  assert.ok(!model.get("is1xN"), "wrong type");
});

test('hasAudience', function (assert) {
  var model = this.subject({});

  assert.ok(!model.get("hasAudience"), "It should has no audience");

  model.set('audience', [1]);
  assert.ok(model.get("hasAudience"), "It should has audience");
});

test('hasCategories', function (assert) {
  var model = this.subject({});

  assert.ok(!model.get("hasCategories"), "It should has no categories");

  model.set('categories', [1]);
  assert.ok(model.get("hasCategories"), "It should has categories");
});
