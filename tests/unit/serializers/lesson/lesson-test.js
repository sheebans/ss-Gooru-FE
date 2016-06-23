import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:lesson/lesson', 'Lesson | Serializer | lesson/lesson');

test('NormalizeQueryRecordResponse for single result', function (assert) {
  const serializer = this.subject();
  const payload = {
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
  const response = serializer.normalizeQueryRecordResponse('any store', 'lesson/lesson', payload);
  const expected = {
    'data': {
      'id': 'fbd76aed-1b8d-4c2c-a9c6-c7603eef347c',
      'type': 'lesson/lesson',
      'attributes': {
        'title': 'Property name conventions',
        'collection': 24413346,
        'visibility': false
      }
    }
  };

  assert.deepEqual(response, expected, 'Wrong response');
});

test('NormalizeQueryRecordResponse for multiple results', function (assert) {
  const serializer = this.subject();
  const payload = [
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
  const response = serializer.normalizeQueryRecordResponse('any store', 'lesson/lesson', payload);
  const expected = {
    'data': [
      {
        'id': 'fbd76aed-1b8d-4c2c-a9c6-c7603eef347c',
        'type': 'lesson/lesson',
        'attributes': {
          'title': 'Property name conventions',
          'collection': 24413346,
          'visibility': false
        }
      },
      {
        'id': 'aaac5d15-8434-43ff-8f8b-78cf0b6fd032',
        'type': 'lesson/lesson',
        'attributes': {
          'title': 'Method naming convention',
          'collection': 24413350,
          'visibility': false
        }
      },
      {
        'id': 'cc2bc04c-05ab-4407-9d76-b7021d6138e3',
        'type': 'lesson/lesson',
        'attributes': {
          'title': 'Class naming conventions',
          'collection': 24413351,
          'visibility': false
        }
      }
    ]
  };

  assert.deepEqual(response, expected, 'Wrong response');
});
