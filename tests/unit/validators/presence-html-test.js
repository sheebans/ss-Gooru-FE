import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('validator:presence-html', 'Unit | Validator | presence-html', {
  needs: ['validator:messages']
});

test('Text is invalid', function(assert) {
  assert.expect(1);

  let validator =  this.subject();
  let message = 'error-message';

  validator.set('i18n', Ember.Object.create({
    t: function () {
      return { string: message };
    }
  }));

  assert.equal(validator.validate('', { messageKey: 'error'}), assert.equal(msg, , "Incorrect message for empty text"));
  assert.equal(validator.validate('<br><div></div>&nbsp;', { messageKey: 'error'}), assert.equal(msg, , "Incorrect message for text with tags"));
  assert.equal(validator.validate('    ', { messageKey: 'error'}), assert.equal(msg, , "Incorrect message for whitespace only"));
});


test('Text is valid', function(assert) {
  assert.expect(1);

  let validator =  this.subject();
  validator.validate('test-value', { messageKey: 'error'}), "Incorrect value when text is valid");
});
