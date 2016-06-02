import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import LessonModel from 'gooru-web/models/content/lesson';

moduleForService('service:api-sdk/lesson', 'Unit | Service | api-sdk/lesson', {
  needs: ['serializer:lesson/lesson', 'model:lesson/lesson', 'adapter:lesson/lesson']
});

test('findById', function (assert) {
  const service = this.subject();
  const response = {
    'summary': {
      'collectionCount': 1,
      'assessmentCount': 1
    },
    'collectionType': 'lesson',
    'collectionId': 24413346,
    'parentGooruOid': '31886eac-f998-493c-aa42-016f53e9fa88',
    'itemSequence': 1,
    'type': 'lesson',
    'lastModifiedUserUid': 'ff90e7e2-7788-48fb-9ce2-7b6d7a828840',
    'title': 'Property name conventions',
    'sharing': 'private',
    'collectionItemId': '262c9b8f-c866-4ce7-89bc-45cc01e62e17',
    'lastModified': 1448917633000,
    'gooruOid': 'fbd76aed-1b8d-4c2c-a9c6-c7603eef347c',
    'user': {
      'username': 'perezedify',
      'gooruUId': 'ff90e7e2-7788-48fb-9ce2-7b6d7a828840',
      'profileImageUrl': 'http://profile-qa.s3.amazonaws.com/ff90e7e2-7788-48fb-9ce2-7b6d7a828840.png'
    }
  };
  const routes = function() {
    this.get('/gooruapi/rest/v1/course/course-id-1/unit/unit-id-1/lesson/lesson-id-1', function () {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  var done = assert.async();
  const promise = service.findById('course-id-1', 'unit-id-1','lesson-id-1');
  promise.then(function(lesson){
    assert.equal(lesson.get('id'), 'fbd76aed-1b8d-4c2c-a9c6-c7603eef347c', 'Wrong lesson id');
    assert.equal(lesson.get('title'), 'Property name conventions', 'Wrong title');
    assert.equal(lesson.get('visibility'), false, 'Wrong visibility');
    assert.equal(lesson.get('collection'), 24413346, 'Wrong collection');
    done();
  });
});

test('findByClassAndCourseAndUnit', function (assert) {
  const service = this.subject();
  const response = [
    {
      'title': 'Property name conventions',
      'gooruOid': 'fbd76aed-1b8d-4c2c-a9c6-c7603eef347c',
      'collectionId': 24413346,
      'visibility': false
    },
    {
      'title': 'Method naming convention',
      'gooruOid': 'aaac5d15-8434-43ff-8f8b-78cf0b6fd032',
      'collectionId': 24413350,
      'visibility': false
    },
    {
      'title': 'Class naming conventions',
      'gooruOid': 'cc2bc04c-05ab-4407-9d76-b7021d6138e3',
      'collectionId': 24413351,
      'visibility': false
    }
  ];
  const routes = function() {
    this.get('/gooruapi/rest/v3/class/class-id-1/course/course-id-1/unit/unit-id-1/lesson', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  var done = assert.async();
  const promise = service.findByClassAndCourseAndUnit('class-id-1', 'course-id-1', 'unit-id-1');
  promise.then(function(lessons){
    assert.equal(lessons.get('length'), 3, 'Missing lessons');
    const lesson = lessons.get('firstObject');
    assert.equal(lesson.get('id'), 'fbd76aed-1b8d-4c2c-a9c6-c7603eef347c', 'Wrong lesson id');
    assert.equal(lesson.get('title'), 'Property name conventions', 'Wrong title');
    assert.equal(lesson.get('visibility'), false, 'Wrong visibility');
    assert.equal(lesson.get('collection'), 24413346, 'Wrong collection');
    done();
  });
});

test('createLesson', function(assert) {
  const service = this.subject();
  let lessonModel = Ember.Object.create();

  assert.expect(2);

  // There is not a Adapter stub in this case
  // Pretender was included because it is needed to simulate the response Headers including the Location value
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/courses/course-id/units/unit-id/lessons', function() {
      return [200, {'Content-Type': 'text/plain', 'Location': 'lesson-id'}, ''];
    }, false);
  });

  service.set('serializer', Ember.Object.create({
    serializeCreateLesson: function(lessonObject) {
      assert.deepEqual(lessonObject, lessonModel, 'Wrong lesson object');
      return {};
    }
  }));

  var done = assert.async();
  service.createLesson('course-id', 'unit-id', lessonModel)
    .then(function() {
      assert.equal(lessonModel.get('id'), 'lesson-id', 'Wrong lesson id');
      done();
    });
});

test('updateLesson', function(assert) {
  const service = this.subject();
  let lessonModel = LessonModel.create({
    id: 'lesson-id'
  });

  assert.expect(1);

  // There is not a Adapter stub in this case
  // Pretender was included because it is needed to simulate the response Headers including the Location value
  this.pretender.map(function() {
    this.put('/api/nucleus/v1/courses/course-id/units/unit-id/lessons/lesson-id', function() {
      return [204, {'Content-Type': 'text/plain'}, ''];
    }, false);
  });

  service.set('serializer', Ember.Object.create({
    serializeUpdateLesson: function(lessonObject) {
      assert.deepEqual(lessonObject, lessonModel, 'Wrong lesson object');
      return {};
    }
  }));

  var done = assert.async();
  service.updateLesson('course-id', 'unit-id', lessonModel)
    .then(function() {
      done();
    });
});

test('Delete Lesson', function(assert) {
  const expectedCourseId = 'course-id';
  const expectedUnitId = 'unit-id';
  const expectedLessonId = 'lesson-id';
  const service = this.subject();

  assert.expect(3);

  service.set('adapter', Ember.Object.create({
    deleteLesson: function(params) {
      assert.equal(params.courseId, expectedCourseId, 'Wrong course id');
      assert.equal(params.unitId, expectedUnitId, 'Wrong unit id');
      assert.equal(params.lessonId, expectedLessonId, 'Wrong lesson id');
      return Ember.RSVP.resolve();
    }
  }));

  var done = assert.async();
  service.deleteLesson('course-id', 'unit-id', 'lesson-id')
    .then(function() {
      done();
    });
});

test('Copy Lesson', function(assert) {
  const service = this.subject();

  assert.expect(1);

  // There is not a Adapter stub in this case
  // Pretender was included because it is needed to simulate the response Headers including the Location value
  this.pretender.map(function() {
    this.post('/api/nucleus/v1/copier/courses/course-id/units/unit-id/lessons/lesson-id', function() {
      return [201, {'Content-Type': 'text/plain', 'Location': 'copy-lesson-id'}, ''];
    }, false);
  });

  var done = assert.async();
  service.copyLesson('course-id', 'unit-id', 'lesson-id')
    .then(function(response) {
      assert.equal(response, 'copy-lesson-id', 'Wrong lesson id');
      done();
    });
});

test('reorderLesson', function(assert) {
  const service = this.subject();
  const expectedUnitId = 'unit-id';

  assert.expect(6);

  service.set('serializer', Ember.Object.create({
    serializeReorderLesson: function(collectionIds) {
      assert.equal(collectionIds.length, 2, 'Wrong total collections');
      assert.equal(collectionIds[0], 'a', 'Wrong id at index 0');
      return 'fake-data';
    }
  }));
  service.set('adapter', Ember.Object.create({
    reorderLesson: function(courseId, unitId, lessonId, data) {
      assert.equal(courseId, 'course-id', 'Wrong course id');
      assert.equal(unitId, expectedUnitId, 'Wrong unit id');
      assert.equal(lessonId, 'lesson-id', 'Wrong lesson id');
      assert.equal(data, 'fake-data', 'Wrong data parameter coming from serializer');
      return Ember.RSVP.resolve();
    }
  }));

  var done = assert.async();
  service.reorderUnit('course-id', expectedUnitId, 'lesson-id', ["a", "b"]).then(function() { done(); });
});

