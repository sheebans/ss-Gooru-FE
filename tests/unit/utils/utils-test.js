import Ember from 'ember';

import {
  alphabeticalStringSort,
  checkStandards,
  courseSectionsPrefix,
  formatDate,
  formatTime,
  formatTimeInSeconds,
  getAnswerResultIcon,
  getReactionIcon,
  getGradeColor ,
  getLetter,
  numberSort,
  generateUUID
  } from 'gooru-web/utils/utils';

import { module, test } from 'qunit';

module('Unit | Utility | utils');

test('alphabeticalStringSort', function (assert) {

  assert.deepEqual(['crayon'].sort(alphabeticalStringSort), ['crayon']);
  assert.deepEqual(['bull', 'brave'].sort(alphabeticalStringSort), ['brave', 'bull']);
  assert.deepEqual(['wave', 'animal', 'Goose'].sort(alphabeticalStringSort), ['animal', 'Goose', 'wave']);
  assert.deepEqual(['Ankle', 'pArrot', 'orange'].sort(alphabeticalStringSort), ['Ankle', 'orange', 'pArrot']);
  assert.deepEqual(['Colbert, John', 'Carson, Michael', 'Caesar, Jules'].sort(alphabeticalStringSort),
    ['Caesar, Jules', 'Carson, Michael', 'Colbert, John']);
});

test('checkStandards', function (assert) {

  var standards = Ember.A();
  standards.addObject(Ember.Object.create({ id: '1', disabled: false }));
  standards.addObject(Ember.Object.create({ id: '2', disabled: false }));
  var checkableStandards = ['1', '2'];
  var codes = ['1', '3'];

  checkStandards(standards, checkableStandards, codes);

  assert.equal(standards[0].get("disabled"), false);
  assert.equal(standards[1].get("disabled"), true);

});

test('courseSectionsPrefix', function (assert) {
  var i18n = Ember.Object.create({
    t: function (key) {
      let letter;
      if (key === 'common.unitInitial') {
        letter = 'U';
      } else if (key === 'common.lessonInitial') {
        letter = 'L';
      } else if (key === 'common.collectionInitial') {
        letter = 'C';
      } else if (key === 'common.assessmentInitial') {
        letter = 'A';
      }
      return letter;
    }
  });

  assert.equal(courseSectionsPrefix(1, 'unit', i18n), 'U2', 'The prefix should be U2');
  assert.equal(courseSectionsPrefix(1, 'lesson', i18n), 'L2', 'The prefix should be L2');
  assert.equal(courseSectionsPrefix(1, 'collection', i18n), 'C2', 'The prefix should be C2');
  assert.equal(courseSectionsPrefix(1, 'assessment', i18n), 'A2', 'The prefix should be A2');
});

test('formatDate', function (assert) {
  let date = new Date(2010, 1, 20);
  date.setSeconds(10);
  date.setMinutes(15);
  date.setHours(11);
  //trying default format
  assert.equal(formatDate(date), 'Saturday, February 20th, 2010 11:15 AM', "Wrong date format");

  //trying custom format
  assert.equal('Feb 20th 10', formatDate(date, "MMM Do YY"));
});

test('formatTime', function (assert) {
  const oneHour = 3600 * 1000;
  assert.equal('1h ', formatTime(oneHour));
  const oneMin = 60 * 1000;
  assert.equal('1m ', formatTime(oneMin));
  const oneSec = 1000;

  assert.equal('1s', formatTime(oneSec));
  assert.equal('1h 1m', formatTime(oneHour + oneMin));
  assert.equal('1m 1s', formatTime(oneMin + oneSec));
  assert.equal('', formatTime(null));
});

test('formatTimeInSeconds', function (assert) {
  assert.equal(formatTimeInSeconds(1), '1s');
  assert.equal(formatTimeInSeconds(3600 + 60), '1h 1m');
  assert.equal(formatTimeInSeconds(60 + 1), '1m 1s');
  assert.equal(formatTimeInSeconds(87), '1m 27s');
  assert.equal(formatTimeInSeconds(119), '1m 59s');
  assert.equal(formatTimeInSeconds(1433), '23m 53s');
  assert.equal(formatTimeInSeconds(null), '');
});

test('getAnswerResultIcon', function (assert) {
  assert.equal(getAnswerResultIcon(true), '<i class="fa fa-check-circle-o answer-correct"></i>');
  assert.equal(getAnswerResultIcon(false), '<i class="fa fa-times-circle-o answer-incorrect"></i>');
  assert.equal(getAnswerResultIcon(null), '');
  assert.equal(getAnswerResultIcon(undefined), '');
  assert.equal(getAnswerResultIcon(''), '');
});

test('getReactionIcon', function (assert) {
  var startsWith = function(value, fragment) {
    return getReactionIcon(value).indexOf(fragment) >= 0;
  };
  assert.equal(startsWith(5, '<div class="emotion emotion-5'), true);
  assert.equal(startsWith(4, '<div class="emotion emotion-4'), true);
  assert.equal(startsWith(3, '<div class="emotion emotion-3'), true);
  assert.equal(startsWith(2, '<div class="emotion emotion-2'), true);
  assert.equal(startsWith(1, '<div class="emotion emotion-1'), true);
  assert.equal(getReactionIcon(null), '&mdash;');
  assert.equal(getReactionIcon(undefined), '');
  assert.equal(getReactionIcon(false), '');
  assert.equal(getReactionIcon(''), '');
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

test('getLetter', function (assert) {
  assert.equal(getLetter(3), 'D', 'The letter should be D');
});

test('numberSort', function (assert) {
  // Per http://stackoverflow.com/questions/4783242/javascript-array-sort-with-undefined-values,
  // undefined values will always be moved to the end of the array
  assert.deepEqual([2].sort(numberSort), [2]);
  assert.deepEqual([2, 0].sort(numberSort), [0, 2]);
  assert.deepEqual([2, undefined].sort(numberSort), [2, undefined]);
  assert.deepEqual([null, 3].sort(numberSort), [null, 3]);
  assert.deepEqual([7, false, undefined, 3].sort(numberSort), [false, 3, 7, undefined]);
  assert.deepEqual([2, 5, 3].sort(numberSort), [2, 3, 5]);
});

test('Check Uuid format', function (assert) {
  var uuid = generateUUID();
  assert.ok(uuid.match(/([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i), 'The uuid is not correct');
});

