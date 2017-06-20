import { moduleFor, test } from 'ember-qunit';

moduleFor('model:rubric/rubric', 'Unit | Model | rubric/rubric', {
  integration: true
});

test('hasAudience', function (assert) {
  var model = this.subject({});
  assert.ok(!model.get('hasAudience'), 'It should has no audience');
  model.set('audience', [1]);
  assert.ok(model.get('hasAudience'), 'It should has audience');
});

test('hasCategories', function (assert) {
  var model = this.subject({});
  assert.ok(!model.get('hasCategories'), 'It should has no categories');
  model.set('categories', [1]);
  assert.ok(model.get('hasCategories'), 'It should has categories');
});
