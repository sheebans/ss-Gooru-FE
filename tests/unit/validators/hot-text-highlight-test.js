import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:hot-text-highlight', 'Unit | Validator | hot-text-highlight', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
