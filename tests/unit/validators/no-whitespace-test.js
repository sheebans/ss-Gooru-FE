import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:no-whitespace', 'Unit | Validator | no-whitespace', {
  needs: ['validator:messages']
});

test('Valid white space', function(assert) {
  var validator = this.subject();
  assert.equal(validator.validate(" "), true, "Should be invalid");
});
