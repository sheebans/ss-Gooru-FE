import Ember from 'ember';
import SessionMixin from '../../../mixins/session';
import { module, test } from 'qunit';

module('Unit | Mixin | session');

// Replace this with your real tests.
test('it works', function(assert) {
  var SessionMixinObject = Ember.Object.extend(SessionMixin);
  var subject = SessionMixinObject.create();
  assert.ok(subject);
});
