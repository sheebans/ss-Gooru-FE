import Ember from 'ember';

import {
  alphabeticalStringSort,
  checkStandards,
  courseSectionsPrefix,
  formatDate,
  formatTime,
  formatTimeInSeconds,
  getAnswerResultIcon,
  getScoreString,
  getReactionIcon,
  getGradeColor ,
  getLetter,
  numberSort,
  generateUUID,
  cleanFilename,
  getFileNameFromInvalidUrl,
  replaceMathExpression,
  addProtocolIfNecessary,
  checkIfIsGoogleDoc,
  prepareFileDataToDownload,
  createFileNameToDownload
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
      }else if (key === 'common.unit') {
        letter = 'Unit';
      } else if (key === 'common.lesson') {
        letter = 'Lesson';
      } else if (key === 'common.collection') {
        letter = 'Collection';
      } else if (key === 'common.assessment') {
        letter = 'Assessment';
      }
      return letter;
    }
  });

  assert.equal(courseSectionsPrefix(1, 'unit', i18n), 'U2', 'The prefix should be U2');
  assert.equal(courseSectionsPrefix(1, 'lesson', i18n), 'L2', 'The prefix should be L2');
  assert.equal(courseSectionsPrefix(1, 'collection', i18n), 'C2', 'The prefix should be C2');
  assert.equal(courseSectionsPrefix(1, 'assessment', i18n), 'A2', 'The prefix should be A2');
  assert.equal(courseSectionsPrefix(1, 'unit', i18n,true), 'Unit 2', 'The prefix should be Unit 2');
  assert.equal(courseSectionsPrefix(1, 'lesson', i18n,true), 'Lesson 2', 'The prefix should be Lesson 2');
  assert.equal(courseSectionsPrefix(1, 'collection', i18n,true), 'Collection 2', 'The prefix should be Collection 2');
  assert.equal(courseSectionsPrefix(1, 'assessment', i18n,true), 'Assessment 2', 'The prefix should be Assessemnt 2');
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
  assert.equal(getAnswerResultIcon(true), '<span class="score answer-correct"><i class="gru-icon material-icons">done</i></span>');
  assert.equal(getAnswerResultIcon(false), '<span class="score answer-incorrect"><i class="gru-icon material-icons">clear</i></span>');
  assert.equal(getAnswerResultIcon(null), '<span class="score answer-undefined"></span>');
  assert.equal(getAnswerResultIcon(undefined), '<span class="score answer-undefined"></span>');
  assert.equal(getAnswerResultIcon(''), '<span class="score answer-undefined"></span>');
});

test('getScoreString', function (assert) {
  assert.equal(getScoreString(64), '<span class="score" style="background-color: #ED8E36">64 %</span>');
  assert.equal(getScoreString(null), '<span class="score answer-undefined"></span>');
  assert.equal(getAnswerResultIcon(undefined), '<span class="score answer-undefined"></span>');
  assert.equal(getAnswerResultIcon(''), '<span class="score answer-undefined"></span>');
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
  assert.equal(getReactionIcon(null), '<div class="align-center">&mdash;</div>');
  assert.equal(getReactionIcon(undefined), '');
  assert.equal(getReactionIcon(false), '');
  assert.equal(getReactionIcon(''), '');
});

test('getGradeColor', function (assert) {

  assert.equal(getGradeColor(0), '#F46360', 'First bracket color -lowest value');
  assert.equal(getGradeColor(30), '#F46360', 'First bracket color -value in the middle');
  assert.equal(getGradeColor(59), '#F46360', 'First bracket color -highest value');

  assert.equal(getGradeColor(60), '#ED8E36', 'Second bracket color -lowest value');
  assert.equal(getGradeColor(65), '#ED8E36', 'Second bracket color -value in the middle');
  assert.equal(getGradeColor(69), '#ED8E36', 'Second bracket color -highest value');

  assert.equal(getGradeColor(70), '#F8BA41', 'Third bracket color -lowest value');
  assert.equal(getGradeColor(75), '#F8BA41', 'Third bracket color -value in the middle');
  assert.equal(getGradeColor(79), '#F8BA41', 'Third bracket color -highest value');

  assert.equal(getGradeColor(80), '#A3CA9F', 'Fourth bracket color -lowest value');
  assert.equal(getGradeColor(85), '#A3CA9F', 'Fourth bracket color -value in the middle');
  assert.equal(getGradeColor(89), '#A3CA9F', 'Fourth bracket color -highest value');

  assert.equal(getGradeColor(90), '#4B9741', 'Fifth bracket color -lowest value');
  assert.equal(getGradeColor(95), '#4B9741', 'Fifth bracket color -value in the middle');
  assert.equal(getGradeColor(100), '#4B9741', 'Fifth bracket color -highest value');
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

test('Clean filename', function (assert) {
  var id = generateUUID() + '.png';
  var url = `//test-bucket01.s3.amazonaws.com/test/${id}`;
  assert.equal(cleanFilename(url), `test/${id}`, 'Wrong filename with complete url.');
  assert.equal(cleanFilename(`http:${url}`), `test/${id}`, 'Wrong filename with complete url.');
  assert.equal(cleanFilename(id), id, 'Wrong filename without complete url.');
  assert.equal(cleanFilename(null), '', 'Wrong filename without complete url.');
  assert.equal(cleanFilename(url, {content: '//test-bucket01.s3.amazonaws.com/test/'}), id, 'Wrong filename with cdn urls.');
});

test('Get File Name from Invalid URL', function (assert) {
  var url = "//content.gooru.org/content/f000/2441/3377/FromAtoZinc.pdf";
  assert.equal(getFileNameFromInvalidUrl(url), "FromAtoZinc.pdf", 'Wrong filename.');
});

test('Replace Math Expression', function (assert) {
  var mathExpression = "<span class='gru-math-expression'><span class='source' hidden=''>\frac{1}{2}</span><span class='katex'>here goes the katex expression</span></span><br>";

  var expected = '<span class="gru-math-expression"><span class="gru-math-expression"><span class="source" hidden="">\frac{1}{2}</span>$$\frac{1}{2}$$</span></span><br>';

  assert.equal(replaceMathExpression(mathExpression), expected, 'Wrong expression');
});

test('add protocol if is necessary', function (assert) {
  var url = "//content.gooru.org/content/f000/2441/3377/FromAtoZinc.pdf";
  assert.equal(addProtocolIfNecessary(url), "http://content.gooru.org/content/f000/2441/3377/FromAtoZinc.pdf", 'Wrong url.');
});

test('check if it is a GoogleDoc', function (assert) {
  var url = "https://docs.google.com/document/any";
  assert.equal(checkIfIsGoogleDoc(url), true, 'Wrong url.');
});

test('prepare csv file data to download filter by assessment', function (assert) {
  let performanceDataHeaders = Ember.A([
    Ember.Object.create({title: 'Unit#1'}),
    Ember.Object.create({title: 'Unit#2'})
  ]);

  let performanceDataMatrix = Ember.A([
    Ember.Object.create({
      performanceData: Ember.A([
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 38, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 38, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 11, completionTotal: 16, hasStarted: true, score: 39, timeSpent: "4m 35s"})
      ])
    }),
    Ember.Object.create({
      user: 'testUser1',
      performanceData: Ember.A([
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 18, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 18, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 10, completionTotal: 16, hasStarted: true, score: 9, timeSpent: "4m 35s"})
      ])
    }),
    Ember.Object.create({
      user: 'testUser2',
      performanceData: Ember.A([
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 18, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 14, completionTotal: 16, hasStarted: true, score: 80, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 16, completionTotal: 16, hasStarted: true, score: 100, timeSpent: "4m 35s"})
      ])
    })
  ]);

  let expectedDataHeaders = Ember.A(["Student", "Average score", "Average time", "Average completion",
    "Unit#1 score", "Unit#1 time", "Unit#1 completion", "Unit#2 score", "Unit#2 time", "Unit#2 completion"
  ]);

  let expectedPerformanceDataMatrix = Ember.A([
    Ember.A(["Class average", "38%", "12/16","4m 35s","38%", "12/16","4m 35s","39%","11/16","4m 35s"]),
    Ember.A(["testUser1", "18%", "12/16","4m 35s","18%", "12/16","4m 35s","9%","10/16","4m 35s"]),
    Ember.A(["testUser2", "18%", "12/16","4m 35s","80%", "14/16","4m 35s","100%","16/16","4m 35s"])
  ]);

  const fileData = prepareFileDataToDownload(performanceDataHeaders, performanceDataMatrix,'assessment',false);

  //header fields
  assert.equal(fileData.fields[0], expectedDataHeaders[0], 'Wrong header field.');
  assert.equal(fileData.fields[1], expectedDataHeaders[1], 'Wrong header field.');
  assert.equal(fileData.fields[2], expectedDataHeaders[2], 'Wrong header field.');
  assert.equal(fileData.fields[3], expectedDataHeaders[3], 'Wrong header field.');
  assert.equal(fileData.fields[4], expectedDataHeaders[4], 'Wrong header field.');
  assert.equal(fileData.fields[5], expectedDataHeaders[5], 'Wrong header field.');
  assert.equal(fileData.fields[6], expectedDataHeaders[6], 'Wrong header field.');
  assert.equal(fileData.fields[7], expectedDataHeaders[7], 'Wrong header field.');
  assert.equal(fileData.fields[8], expectedDataHeaders[8], 'Wrong header field.');
  assert.equal(fileData.fields[9], expectedDataHeaders[9], 'Wrong header field.');

  //data table fields
  assert.equal(fileData.data[0][0], expectedPerformanceDataMatrix[0][0], 'Wrong data table field.');
  assert.equal(fileData.data[0][1], expectedPerformanceDataMatrix[0][1], 'Wrong data table field.');
  assert.equal(fileData.data[0][2], expectedPerformanceDataMatrix[0][2], 'Wrong data table field.');
  assert.equal(fileData.data[0][3], expectedPerformanceDataMatrix[0][3], 'Wrong data table field.');
  assert.equal(fileData.data[0][4], expectedPerformanceDataMatrix[0][4], 'Wrong data table field.');
  assert.equal(fileData.data[0][5], expectedPerformanceDataMatrix[0][5], 'Wrong data table field.');
  assert.equal(fileData.data[0][6], expectedPerformanceDataMatrix[0][6], 'Wrong data table field.');
  assert.equal(fileData.data[0][7], expectedPerformanceDataMatrix[0][7], 'Wrong data table field.');
  assert.equal(fileData.data[0][8], expectedPerformanceDataMatrix[0][8], 'Wrong data table field.');
  assert.equal(fileData.data[0][9], expectedPerformanceDataMatrix[0][9], 'Wrong data table field.');

  assert.equal(fileData.data[1][0], expectedPerformanceDataMatrix[1][0], 'Wrong data table field.');
  assert.equal(fileData.data[1][1], expectedPerformanceDataMatrix[1][1], 'Wrong data table field.');
  assert.equal(fileData.data[1][2], expectedPerformanceDataMatrix[1][2], 'Wrong data table field.');
  assert.equal(fileData.data[1][3], expectedPerformanceDataMatrix[1][3], 'Wrong data table field.');
  assert.equal(fileData.data[1][4], expectedPerformanceDataMatrix[1][4], 'Wrong data table field.');
  assert.equal(fileData.data[1][5], expectedPerformanceDataMatrix[1][5], 'Wrong data table field.');
  assert.equal(fileData.data[1][6], expectedPerformanceDataMatrix[1][6], 'Wrong data table field.');
  assert.equal(fileData.data[1][7], expectedPerformanceDataMatrix[1][7], 'Wrong data table field.');
  assert.equal(fileData.data[1][8], expectedPerformanceDataMatrix[1][8], 'Wrong data table field.');
  assert.equal(fileData.data[1][9], expectedPerformanceDataMatrix[1][9], 'Wrong data table field.');

  assert.equal(fileData.data[2][0], expectedPerformanceDataMatrix[2][0], 'Wrong data table field.');
  assert.equal(fileData.data[2][1], expectedPerformanceDataMatrix[2][1], 'Wrong data table field.');
  assert.equal(fileData.data[2][2], expectedPerformanceDataMatrix[2][2], 'Wrong data table field.');
  assert.equal(fileData.data[2][3], expectedPerformanceDataMatrix[2][3], 'Wrong data table field.');
  assert.equal(fileData.data[2][4], expectedPerformanceDataMatrix[2][4], 'Wrong data table field.');
  assert.equal(fileData.data[2][5], expectedPerformanceDataMatrix[2][5], 'Wrong data table field.');
  assert.equal(fileData.data[2][6], expectedPerformanceDataMatrix[2][6], 'Wrong data table field.');
  assert.equal(fileData.data[2][7], expectedPerformanceDataMatrix[2][7], 'Wrong data table field.');
  assert.equal(fileData.data[2][8], expectedPerformanceDataMatrix[2][8], 'Wrong data table field.');
  assert.equal(fileData.data[2][9], expectedPerformanceDataMatrix[2][9], 'Wrong data table field.');
});

test('prepare csv file data to download filter by collection', function (assert) {
  let performanceDataHeaders = Ember.A([
    Ember.Object.create({title: 'Unit#1'}),
    Ember.Object.create({title: 'Unit#2'})
  ]);

  let performanceDataMatrix = Ember.A([
    Ember.Object.create({
      performanceData: Ember.A([
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 38, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 38, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 11, completionTotal: 16, hasStarted: true, score: 39, timeSpent: "4m 35s"})
      ])
    }),
    Ember.Object.create({
      user: 'testUser1',
      performanceData: Ember.A([
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 18, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 18, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 10, completionTotal: 16, hasStarted: true, score: 9, timeSpent: "4m 35s"})
      ])
    }),
    Ember.Object.create({
      user: 'testUser2',
      performanceData: Ember.A([
        Ember.Object.create({completionDone: 12, completionTotal: 16, hasStarted: true, score: 18, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 14, completionTotal: 16, hasStarted: true, score: 80, timeSpent: "4m 35s"}),
        Ember.Object.create({completionDone: 16, completionTotal: 16, hasStarted: true, score: 100, timeSpent: "4m 35s"})
      ])
    })
  ]);

  let expectedDataHeaders = Ember.A(["Student", "Average time", "Unit#1 time","Unit#2 time"]);

  let expectedPerformanceDataMatrix = Ember.A([
    Ember.A(["Class average", "4m 35s","4m 35s","4m 35s"]),
    Ember.A(["testUser1", "4m 35s","4m 35s","4m 35s"]),
    Ember.A(["testUser2", "4m 35s","4m 35s","4m 35s"])
  ]);

  const fileData = prepareFileDataToDownload(performanceDataHeaders, performanceDataMatrix,'collection',false);

  //header fields
  assert.equal(fileData.fields[0], expectedDataHeaders[0], 'Wrong header field.');
  assert.equal(fileData.fields[1], expectedDataHeaders[1], 'Wrong header field.');
  assert.equal(fileData.fields[2], expectedDataHeaders[2], 'Wrong header field.');
  assert.equal(fileData.fields[3], expectedDataHeaders[3], 'Wrong header field.');

  //data table fields
  assert.equal(fileData.data[0][0], expectedPerformanceDataMatrix[0][0], 'Wrong data table field.');
  assert.equal(fileData.data[0][1], expectedPerformanceDataMatrix[0][1], 'Wrong data table field.');
  assert.equal(fileData.data[0][2], expectedPerformanceDataMatrix[0][2], 'Wrong data table field.');
  assert.equal(fileData.data[0][3], expectedPerformanceDataMatrix[0][3], 'Wrong data table field.');

  assert.equal(fileData.data[1][0], expectedPerformanceDataMatrix[1][0], 'Wrong data table field.');
  assert.equal(fileData.data[1][1], expectedPerformanceDataMatrix[1][1], 'Wrong data table field.');
  assert.equal(fileData.data[1][2], expectedPerformanceDataMatrix[1][2], 'Wrong data table field.');
  assert.equal(fileData.data[1][3], expectedPerformanceDataMatrix[1][3], 'Wrong data table field.');

  assert.equal(fileData.data[2][0], expectedPerformanceDataMatrix[2][0], 'Wrong data table field.');
  assert.equal(fileData.data[2][1], expectedPerformanceDataMatrix[2][1], 'Wrong data table field.');
  assert.equal(fileData.data[2][2], expectedPerformanceDataMatrix[2][2], 'Wrong data table field.');
  assert.equal(fileData.data[2][3], expectedPerformanceDataMatrix[2][3], 'Wrong data table field.');
});

test('Create File Name To Download', function (assert) {
  var fileName = "Class Test_Course Test_10-21-16";
  assert.equal(createFileNameToDownload(fileName), "classtest_coursetest_10-21-16", 'Wrong filename.');
});

