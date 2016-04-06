import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:host', 'Unit | Validator | host', {
  needs: ['validator:messages']
});

test('Invalid host', function(assert) {
  var validator = this.subject();
  assert.equal(validator.validate(window.location.href), 'You can not add a Gooru url as a resource.', "Should be invalid");
});
