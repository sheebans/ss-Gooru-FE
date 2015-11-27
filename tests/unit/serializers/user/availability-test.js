import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:user/availability', 'Unit | Serializer | user/availability');

test('normalizeSingleResponse', function (assert) {
  const serializer = this.subject();

  const
    payload = {
      "confirmStatus": 0,
      "gooruUId": "1726fb25-2f09-4968-b86b-c170bd58ac4c",
      "collaboratorCheck": false,
      "availability": true
    },
    response = serializer.normalizeSingleResponse("any store", "user/availability", payload);

  const expected = {

    "data": {
      "id": "1726fb25-2f09-4968-b86b-c170bd58ac4c",
      "type": "user/availability",
      "attributes": {
        "confirmStatus": 0,
        "collaboratorCheck": false,
        "availability": true
      }
    }

  };

  assert.deepEqual(response, expected, "Wrong response");

});
