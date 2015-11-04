import Ember from 'ember';
import { checkStandards } from '../../../utils/utils';
import { module, test } from 'qunit';

module('Unit | Utility | utils');

// Replace this with your real tests.
test('Check standards', function(assert) {

  var standards = Ember.A();
  standards.addObject(Ember.Object.create({ id: '1', disabled: false }));
  standards.addObject(Ember.Object.create({ id: '2', disabled: false }));
  var checkableStandards = ['1', '2'];
  var codes = ['1', '3'];

  checkStandards(standards, checkableStandards, codes);

  assert.equal(standards[0].get("disabled"), false);
  assert.equal(standards[1].get("disabled"), true);

});
