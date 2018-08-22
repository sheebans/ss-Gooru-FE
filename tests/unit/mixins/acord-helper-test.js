import Ember from 'ember';
import AcordHelperMixin from 'gooru-web/mixins/acord-helper';
import { module, test } from 'qunit';

module('Unit | Mixin | acord helper');

// Replace this with your real tests.
test('it works', function(assert) {
  let AcordHelperObject = Ember.Object.extend(AcordHelperMixin);
  let subject = AcordHelperObject.create();
  assert.ok(subject);
});
