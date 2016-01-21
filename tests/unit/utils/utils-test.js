import Ember from 'ember';
import { checkStandards, formatTime, getGradeColor , getLetter, formatDate} from '../../../utils/utils';
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

test('getGradeColor', function (assert) {

  assert.equal(getGradeColor(0), '#E08282', 'First bracket color -lowest value');
  assert.equal(getGradeColor(30), '#E08282', 'First bracket color -value in the middle');
  assert.equal(getGradeColor(59), '#E08282', 'First bracket color -highest value');

  assert.equal(getGradeColor(60), '#FEC956', 'Second bracket color -lowest value');
  assert.equal(getGradeColor(65), '#FEC956', 'Second bracket color -value in the middle');
  assert.equal(getGradeColor(69), '#FEC956', 'Second bracket color -highest value');

  assert.equal(getGradeColor(70), '#EDF167', 'Third bracket color -lowest value');
  assert.equal(getGradeColor(75), '#EDF167', 'Third bracket color -value in the middle');
  assert.equal(getGradeColor(79), '#EDF167', 'Third bracket color -highest value');

  assert.equal(getGradeColor(80), '#A2DE81', 'Fourth bracket color -lowest value');
  assert.equal(getGradeColor(85), '#A2DE81', 'Fourth bracket color -value in the middle');
  assert.equal(getGradeColor(89), '#A2DE81', 'Fourth bracket color -highest value');

  assert.equal(getGradeColor(90), '#3FC380', 'Fifth bracket color -lowest value');
  assert.equal(getGradeColor(95), '#3FC380', 'Fifth bracket color -value in the middle');
  assert.equal(getGradeColor(100), '#3FC380', 'Fifth bracket color -highest value');
});

test('Check formatDate', function(assert) {
  let date = new Date(2010, 1, 20);
  date.setSeconds(10);
  date.setMinutes(15);
  date.setHours(11);
  //trying default format
  assert.equal(formatDate(date), 'Saturday, February 20th, 2010 11:15 AM', "Wrong date format");

  //trying custom format
  assert.equal('Feb 20th 10', formatDate(date, "MMM Do YY"));
});

test('getLetter', function (assert) {
  assert.equal(getLetter(3), 'D', 'The letter should be D');
});

