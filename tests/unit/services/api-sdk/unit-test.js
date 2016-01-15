import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/unit', 'Unit | Service | api-sdk/unit', {
  needs: ['serializer:unit/unit', 'model:unit/unit', 'adapter:unit/unit']
});

test('findById', function(assert) {
  const service = this.subject();
  const response = {
    'summary': {
      'lessonCount': 3
    },
    'collectionType': 'unit',
    'collectionId': 24413345,
    'parentGooruOid': '77836ac2-b462-43b3-a204-b86e44382b45',
    'itemSequence': 1,
    'type': 'unit',
    'lastModifiedUserUid': 'ff90e7e2-7788-48fb-9ce2-7b6d7a828840',
    'title': 'Code conventions',
    'sharing': 'private',
    'ideas': '',
    'collectionItemId': '49557e9b-3aae-4cda-ab7f-23f8c9b2bd31',
    'lastModified': 1448581167000,
    'questions': '',
    'gooruOid': '31886eac-f998-493c-aa42-016f53e9fa88',
    'taxonomyCourse': [
      {
        'id': 36,
        'name': 'Other',
        'subjectId': 2
      }
    ],
    'user': {
      'username': 'perezedify',
      'gooruUId': 'ff90e7e2-7788-48fb-9ce2-7b6d7a828840',
      'profileImageUrl': 'http://profile-qa.s3.amazonaws.com/ff90e7e2-7788-48fb-9ce2-7b6d7a828840.png'
    }
  };
  const routes = function() {
    this.get('/gooruapi/rest/v1/course/course-id-1/unit/unit-id-1', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  var done = assert.async();
  service.findById('course-id-1', 'unit-id-1')
    .then(function(unit) {
      assert.equal(unit.get('id'), '31886eac-f998-493c-aa42-016f53e9fa88', 'Wrong unit id');
      assert.equal(unit.get('title'), 'Code conventions', 'Wrong title');
      assert.equal(unit.get('visibility'), false, 'Wrong visibility');
      assert.equal(unit.get('collection'), 24413345, 'Wrong collection');
      done();
    });
});

test('findByClassAndCourse', function(assert) {
  const service = this.subject();
  const response = [
    {
      'title': 'Code conventions',
      'gooruOid': '31886eac-f998-493c-aa42-016f53e9fa88',
      'collectionId': 24413345,
      'visibility': false
    },
    {
      'title': 'Unit testing',
      'gooruOid': '7deebd55-1976-40a2-8e46-3b8ec5b6d388',
      'collectionId': 24413347,
      'visibility': false
    }
  ];
  const routes = function() {
    this.get('/gooruapi/rest/v3/class/class-id-1/course/course-id-1/unit', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  var done = assert.async();
  service.findByClassAndCourse('class-id-1', 'course-id-1')
    .then(function(units) {
      assert.equal(units.get('length'), 2, 'Missing units');
      const unit = units.get('firstObject');
      assert.equal(unit.get('id'), '31886eac-f998-493c-aa42-016f53e9fa88', 'Wrong unit id');
      assert.equal(unit.get('title'), 'Code conventions', 'Wrong title');
      assert.equal(unit.get('visibility'), false, 'Wrong visibility');
      assert.equal(unit.get('collection'), 24413345, 'Wrong collection');
      done();
    });
});
