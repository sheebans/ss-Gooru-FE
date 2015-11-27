import UnitSerializer from '../../../../serializers/unit/unit';
import { module, test } from 'qunit';

module('Unit | Serializer | unit unit');

test('normalizeQueryRecordResponse', function (assert) {
  const serializer = UnitSerializer.create();

  const
    payload = [
      {
        "title": "Code conventions",
        "gooruOid": "31886eac-f998-493c-aa42-016f53e9fa88",
        "collectionId": 24413345,
        "visibility": false
      },
      {
        "title": "Unit testing",
        "gooruOid": "7deebd55-1976-40a2-8e46-3b8ec5b6d388",
        "collectionId": 24413347,
        "visibility": false
      }
    ],
    response = serializer.normalizeQueryRecordResponse("any store", "unit/unit", payload);

  const expected = {
    "data": [
      {
        "id": "31886eac-f998-493c-aa42-016f53e9fa88",
        "type": "unit/unit",
        "attributes": {
          "title": "Code conventions",
          "collection": 24413345,
          "visibility": false
        }
      },
      {
        "id": "7deebd55-1976-40a2-8e46-3b8ec5b6d388",
        "type": "unit/unit",
        "attributes": {
          "title": "Unit testing",
          "collection": 24413347,
          "visibility": false
        }
      }
    ]
  };

  assert.deepEqual(response, expected, "Wrong response");

});
