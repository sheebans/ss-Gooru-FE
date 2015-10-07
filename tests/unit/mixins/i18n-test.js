import Ember from 'ember';
import I18nMixin from '../../../mixins/i18n';
import { module, test } from 'qunit';

module('Unit | Mixin | i18n');

// Replace this with your real tests.
test('it works', function(assert) {
  var I18nObject = Ember.Object.extend(I18nMixin);
  var subject = I18nObject.create();
  assert.ok(subject);
});
