import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/performance', 'Unit | Service | api-sdk/performance', {
  needs: [
    'serializer:performance/performance', 'serializer:performance/lesson-performance',
    'model:performance/performance', 'model:performance/lesson-performance',
    'model:performance/student-performance', 'model:user/user',
    'model:meta', 'model:taxonomy-preference', 'model:performance/class-performance',
    'adapter:performance/performance', 'adapter:performance/lesson-performance'
  ]
});

test('findUnitPerformanceByClassAndCourse', function (assert) {
  const service = this.subject();
  const response = {
      'content': [{
        'collectionCount': 0,
        'gooruOId': '0619777a-45fa-4bfe-b800-40b2ab158c7a',
        'assessmentCount': 0,
        'collectionsViewed': 0,
        'type': 'unit',
        'url': null,
        'totalStudyTime': 0,
        'title': 'Quiz :: Indian History',
        'thumbnail': null,
        'sequence': 1,
        'scoreInPercentage': 0,
        'questionType': null,
        'assessmentsAttempted': 0
      }],
      'message': null,
      'paginate': null
    };
  const routes = function () {
    this.get('/insights/api/v1/class/the-class-id/course/the-course-id/progress', function () {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  var done = assert.async();
  const promise = service.findUnitPerformanceByClassAndCourse('the-user-id', 'the-class-id', 'the-course-id');
  promise.then(function(units){
    assert.equal(units.get('length'), 1, 'Missing units performance');
    const unit = units.get('firstObject');
    assert.equal(unit.get('id'), '0619777a-45fa-4bfe-b800-40b2ab158c7a', 'Wrong id');
    assert.equal(unit.get('type'), 'unit', 'Wrong type');
    assert.equal(unit.get('title'), 'Quiz :: Indian History', 'Wrong title');
    assert.equal(unit.get('score'), 0, 'Wrong score');
    assert.equal(unit.get('completionDone'), 0, 'Wrong completion done');
    assert.equal(unit.get('completionTotal'), 1, 'Wrong completion total');
    assert.equal(unit.get('timeSpent'), 0, 'Wrong time spent');
    assert.equal(unit.get('ratingScore'), 0, 'Wrong rating score');
    assert.equal(unit.get('attempts'), 0, 'Wrong attempts');
    done();
  });
});

test('findLessonPerformanceByClassAndCourseAndUnit', function (assert) {
  const service = this.subject();
  const response = {
    'content': [{
      'title': 'Buddisum',
      'thumbnail': null,
      'gooruOId': '2cd0cb03-91f6-4a8f-b799-2f04039e02c5',
      'scoreStatus': 'NotAttempted',
      'views': 0,
      'sequence': 1,
      'item': [{
        'title': 'General Knowledge Indian History',
        'thumbnail': 'http:////qacdn.gooru.org/qalive//f000/2429/2304//',
        'gooruOId': '0c5cd8aa-d023-4672-9598-f4f527df4760',
        'views': 0,
        'sequence': 2,
        'scoreInPercentage': 0,
        'questionType': null,
        'timeSpent': 0,
        'type': 'collection',
        'url': null
      }, {
        'title': 'Quiz 2 : GK',
        'thumbnail': 'http:////qacdn.gooru.org/qalive//f000/2429/7049//',
        'gooruOId': '792c05b3-2214-4627-acef-22f8d5ed394a',
        'views': 0,
        'sequence': 3,
        'scoreInPercentage': 0,
        'questionType': null,
        'timeSpent': 0,
        'type': 'assessment',
        'url': null
      }, {
        'title': 'Quiz : GK',
        'thumbnail': 'http:////qacdn.gooru.org/qalive//f000/2429/2561//',
        'gooruOId': 'bc116a9b-7252-45e0-96df-2f786d6a5da3',
        'views': 0,
        'sequence': 1,
        'scoreInPercentage': 0,
        'questionType': null,
        'timeSpent': 0,
        'type': 'assessment',
        'url': null
      }],
      'scoreInPercentage': 0,
      'questionType': null,
      'timeSpent': 0,
      'type': 'lesson',
      'url': null
    }],
    'message': null,
    'paginate': null
  };
  const routes = function () {
    this.get('/insights/api/v1/class/the-class-id/course/the-course-id/unit/the-unit-id/progress', function () {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  var done = assert.async();
  const promise = service.findLessonPerformanceByClassAndCourseAndUnit('the-user-id', 'the-class-id', 'the-course-id', 'the-unit-id');
  promise.then(function(lessons){
    assert.equal(lessons.get('length'), 1, 'Missing lessons performance');
    const lesson = lessons.get('firstObject');
    assert.equal(lesson.get('id'), '2cd0cb03-91f6-4a8f-b799-2f04039e02c5', 'Wrong id');
    assert.equal(lesson.get('type'), 'lesson', 'Wrong type');
    assert.equal(lesson.get('title'), 'Buddisum', 'Wrong title');
    assert.equal(lesson.get('score'), 0, 'Wrong score');
    assert.equal(lesson.get('completionDone'), 0, 'Wrong completion done');
    assert.equal(lesson.get('completionTotal'), 1, 'Wrong completion total');
    assert.equal(lesson.get('timeSpent'), 0, 'Wrong time spent');
    assert.equal(lesson.get('ratingScore'), 0, 'Wrong rating score');
    assert.equal(lesson.get('attempts'), 0, 'Wrong attempts');
    assert.equal(lesson.get('collections.length'), 3, 'Missing lesson collections');
    const collection = lesson.get('collections.firstObject');
    assert.equal(collection.get('id'), '0c5cd8aa-d023-4672-9598-f4f527df4760', 'Wrong id');
    assert.equal(collection.get('type'), 'collection', 'Wrong type');
    assert.equal(collection.get('title'), 'General Knowledge Indian History', 'Wrong title');
    assert.equal(collection.get('score'), 0, 'Wrong score');
    assert.equal(collection.get('completionDone'), 0, 'Wrong completion done');
    assert.equal(collection.get('completionTotal'), 1, 'Wrong completion total');
    assert.equal(collection.get('timeSpent'), 0, 'Wrong time spent');
    assert.equal(collection.get('ratingScore'), 0, 'Wrong rating score');
    assert.equal(collection.get('attempts'), 0, 'Wrong attempts');
    done();
  });
});

test('findClassPerformanceByClassAndCourse', function (assert) {
  const service = this.subject();
  var done = assert.async();
  Ember.run(function () {
    const promise = service.findClassPerformanceByClassAndCourse('the-class-id', 'the-course-id', {
      users: [
        {
          id: 'user-id-1',
          username: 'username-user-id-1',
          firstName: 'FirstName-user-id-1',
          lastName: 'LastName-user-id-1',
          units: ['unit-id-1', 'unit-id-2', 'unit-id-3', 'unit-id-4']
        },
        {
          id: 'user-id-2',
          username: 'username-user-id-2',
          firstName: 'FirstName-user-id-2',
          lastName: 'LastName-user-id-2',
          units: ['unit-id-1', 'unit-id-2', 'unit-id-3']
        },
        {
          id: 'user-id-3',
          username: 'username-user-id-3',
          firstName: 'FirstName-user-id-3',
          lastName: 'LastName-user-id-3',
          units: ['unit-id-1']
        }
      ]
    });
    promise.then(function (classPerformance) {
      assert.ok(classPerformance.calculateAverageScoreByItem('unit-id-1') > 0, 'Wrong average score existing unit');
      assert.ok(classPerformance.calculateAverageScoreByItem('unit-id-5') === 0, 'Wrong average score non-existing unit');
      assert.ok(classPerformance.calculateAverageCompletionDoneByItem('unit-id-1') > 0, 'Wrong average completion done existing unit');
      assert.ok(classPerformance.calculateAverageCompletionDoneByItem('unit-id-5') === 0, 'Wrong average completion done non-existing unit');
      assert.ok(classPerformance.calculateAverageTimeSpentByItem('unit-id-1') > 0, 'Wrong average time spent existing unit');
      assert.ok(classPerformance.calculateAverageTimeSpentByItem('unit-id-5') === 0, 'Wrong average time spent non-existing unit');
      const studentPerformanceData = classPerformance.get('studentPerformanceData');
      assert.equal(studentPerformanceData.get('length'), 3, 'Missing student performance data');
      const studentPerformance = studentPerformanceData.get('firstObject');
      assert.ok(studentPerformance.get('averageScore') > 0, 'Wrong student average score');
      assert.ok(studentPerformance.get('averageCompletionDone') > 0, 'Wrong student average completion done');
      assert.ok(studentPerformance.get('averageTimeSpent') > 0, 'Wrong student average time spent');
      const user = studentPerformance.get('user');
      assert.equal(user.get('id'), 'user-id-1', 'Wrong user id');
      assert.equal(user.get('username'), 'username-user-id-1', 'Wrong username');
      assert.equal(user.get('firstName'), 'FirstName-user-id-1', 'Wrong firstName');
      assert.equal(user.get('lastName'), 'LastName-user-id-1', 'Wrong lastName');
      const performanceData = studentPerformance.get('performanceData');
      assert.equal(performanceData.get('length'), 4, 'Missing student performance data');
      const performance = performanceData.get('firstObject');
      assert.equal(performance.get('realId'), 'unit-id-1', 'Wrong performance id');
      assert.equal(performance.get('title'), 'Title for - unit-id-1', 'Wrong performance title');
      assert.equal(performance.get('type'), 'unit', 'Wrong performance type');
      done();
    });
  });
});
