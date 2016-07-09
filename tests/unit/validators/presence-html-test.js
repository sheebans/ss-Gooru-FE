import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

moduleFor('validator:presence-html', 'Unit | Validator | presence-html', {
  needs: ['validator:messages']
});

test('Text is empty', function(assert) {
  assert.expect(1);

  let validator =  this.subject();
  let done = assert.async();
  let message = 'error-message';

  validator.set('i18n', Ember.Object.create({
    t: function () {
      return { string: message };
    }
  }));

  console.log(validator);
  console.log(BaseValidator);
  validator.validate('', { messageKey: 'error'}).then((msg) => {
    assert.equal(msg, message, "Incorrect message");
    done();
  });
});

test('Text with html tags', function(assert) {
  assert.expect(1);

  let validator =  this.subject();
  let done = assert.async();
  let message = 'error-message';

  validator.set('i18n', Ember.Object.create({
    t: function () {
      return { string: message };
    }
  }));

  validator.validate('<br><div></div>&nbsp;', { messageKey: 'error'}).then((msg) => {
    assert.equal(msg, message, "Incorrect message");
    done();
  });
});

test('Text with only spaces', function(assert) {
  assert.expect(1);

  let validator =  this.subject();
  let done = assert.async();
  let message = 'error-message';

  validator.set('i18n', Ember.Object.create({
    t: function () {
      return { string: message };
    }
  }));

  validator.validate('    ', { messageKey: 'error'}).then((msg) => {
    assert.equal(msg, message, "Incorrect message");
    done();
  });
});

test('Valid text', function(assert) {
  assert.expect(1);

  let validator =  this.subject();
  let done = assert.async();

  validator.validate('test-value', { messageKey: 'error'}).then((msg) => {
    assert.ok(msg, "Incorrect message");
    done();
  });
});
