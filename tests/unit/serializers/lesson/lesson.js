import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:lesson/lesson', 'Lesson | Serializer | unit/unit');

test('normalizeQueryRecordResponse', function (assert) {
  const serializer = this.subject();

  const
    payload = [
      {
        "title": "Property name conventions",
        "gooruOid": "fbd76aed-1b8d-4c2c-a9c6-c7603eef347c",
        "collectionId": 24413346,
        "visibility": false
      },
      {
        "title": "Method naming convention",
        "gooruOid": "aaac5d15-8434-43ff-8f8b-78cf0b6fd032",
        "collectionId": 24413350,
        "visibility": false
      },
      {
        "title": "Class naming conventions",
        "gooruOid": "cc2bc04c-05ab-4407-9d76-b7021d6138e3",
        "collectionId": 24413351,
        "visibility": false
      }
    ],
    response = serializer.normalizeQueryRecordResponse("any store", "lesson/lesson", payload);

  const expected = {
    "data": [
      {
        "id": "fbd76aed-1b8d-4c2c-a9c6-c7603eef347c",
        "type": "lesson/lesson",
        "attributes": {
          "title": "Property name conventions",
          "collection": 24413346,
          "visibility": false
        }
      },
      {
        "id": "aaac5d15-8434-43ff-8f8b-78cf0b6fd032",
        "type": "unit/unit",
        "attributes": {
          "title": "Method naming convention",
          "collection": 24413350,
          "visibility": false
        }
      },
      {
        "id": "cc2bc04c-05ab-4407-9d76-b7021d6138e3",
        "type": "unit/unit",
        "attributes": {
          "title": "Class naming conventions",
          "collection": 24413351,
          "visibility": false
        }
      }
    ]
  };

  assert.deepEqual(response, expected, "Wrong response");

});
