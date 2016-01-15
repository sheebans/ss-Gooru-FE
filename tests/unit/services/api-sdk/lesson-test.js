import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

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
