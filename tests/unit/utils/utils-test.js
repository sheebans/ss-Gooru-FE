import Ember from 'ember';
import { checkStandards, formatTime, getGradeBracket } from '../../../utils/utils';
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

test('Check formatTime', function(assert) {
  const oneHour = 3600 * 1000;
  assert.equal('1h ', formatTime(oneHour));
  const oneMin = 60 * 1000;
  assert.equal('1m ', formatTime(oneMin));
  const oneSec = 1 * 1000;
  assert.equal('1s', formatTime(oneSec));
  assert.equal('1h 1m', formatTime(oneHour + oneMin));
  assert.equal('1m 1s', formatTime(oneMin + oneSec));
});

test('getGradeBracket', function (assert) {

  assert.equal(getGradeBracket(0), 0, 'Grade bracket 0 -lowest value');
  assert.equal(getGradeBracket(30), 0, 'Grade bracket 0 -value in the middle');
  assert.equal(getGradeBracket(59), 0, 'Grade bracket 0 -highest value');

  assert.equal(getGradeBracket(60), 1, 'Grade bracket 1 -lowest value');
  assert.equal(getGradeBracket(65), 1, 'Grade bracket 1 -value in the middle');
  assert.equal(getGradeBracket(69), 1, 'Grade bracket 1 -highest value');

  assert.equal(getGradeBracket(70), 2, 'Grade bracket 2 -lowest value');
  assert.equal(getGradeBracket(75), 2, 'Grade bracket 2 -value in the middle');
  assert.equal(getGradeBracket(79), 2, 'Grade bracket 2 -highest value');

  assert.equal(getGradeBracket(80), 3, 'Grade bracket 3 -lowest value');
  assert.equal(getGradeBracket(85), 3, 'Grade bracket 3 -value in the middle');
  assert.equal(getGradeBracket(89), 3, 'Grade bracket 3 -highest value');

  assert.equal(getGradeBracket(90), 4, 'Grade bracket 4 -lowest value');
  assert.equal(getGradeBracket(95), 4, 'Grade bracket 4 -value in the middle');
  assert.equal(getGradeBracket(100), 4, 'Grade bracket 4 -highest value');
});
