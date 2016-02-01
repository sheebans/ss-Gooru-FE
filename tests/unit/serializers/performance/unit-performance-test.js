import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:performance/unit-performance', 'Unit | Serializer | performance/unit-performance');

test('normalizeQueryRecordResponse', function(assert) {
  const serializer = this.subject();
  const payload = {
    "content": [
      {
        "userUid": "6f337b1c-0b0d-49b3-8314-e279181aeddf",
        "usageData": [
          {
            "unitId": "31886eac-f998-493c-aa42-016f53e9fa88",
            "completionCount": 5,
            "scoreInPercentage": 80,
            "timeSpent": 121507,
            "attempts": 16,
            "totalCount": 10
          },
          {
            "unitId": "7deebd55-1976-40a2-8e46-3b8ec5b6d388",
            "completionCount": 3,
            "scoreInPercentage": 55,
            "timeSpent": 215122,
            "attempts": 7,
            "totalCount": 10
          },
          {
            "unitId": "21654d76-45e7-45e9-97ab-5f96a14da135",
            "completionCount": 3,
            "scoreInPercentage": 55,
            "timeSpent": 215122,
            "attempts": 7,
            "totalCount": 10
          },
          {
            "unitId": "c1f810a2-c87f-48f5-a899-0d9753383042",
            "completionCount": 3,
            "scoreInPercentage": 55,
            "timeSpent": 215122,
            "attempts": 7,
            "totalCount": 10
          },
          {
            "unitId": "dfc99db4-d331-4733-ac06-35358cee5c64",
            "completionCount": 3,
            "scoreInPercentage": 55,
            "timeSpent": 215122,
            "attempts": 7,
            "totalCount": 10
          }
        ]
      }
    ],
    "message": null,
    "paginate": null
  };
  const expected = {
    "data": [{
      "id": "31886eac-f998-493c-aa42-016f53e9fa88",
      "type": "performance/unit-performance",
      "attributes": {
        "type": "unit",
        "score": 80,
        "completionDone": 5,
        "completionTotal": 10,
        "timeSpent": 121507,
        "attempts": 16,
        "ratingScore": 0
      }
    }, {
      "id": "7deebd55-1976-40a2-8e46-3b8ec5b6d388",
      "type": "performance/unit-performance",
      "attributes": {
        "type": "unit",
        "score": 55,
        "completionDone": 3,
        "completionTotal": 10,
        "timeSpent": 215122,
        "attempts": 7,
        "ratingScore": 0
      }
    }, {
      "id": "21654d76-45e7-45e9-97ab-5f96a14da135",
      "type": "performance/unit-performance",
      "attributes": {
        "type": "unit",
        "score": 55,
        "completionDone": 3,
        "completionTotal": 10,
        "timeSpent": 215122,
        "attempts": 7,
        "ratingScore": 0
      }
    }, {
      "id": "c1f810a2-c87f-48f5-a899-0d9753383042",
      "type": "performance/unit-performance",
      "attributes": {
        "type": "unit",
        "score": 55,
        "completionDone": 3,
        "completionTotal": 10,
        "timeSpent": 215122,
        "attempts": 7,
        "ratingScore": 0
      }
    }, {
      "id": "dfc99db4-d331-4733-ac06-35358cee5c64",
      "type": "performance/unit-performance",
      "attributes": {
        "type": "unit",
        "score": 55,
        "completionDone": 3,
        "completionTotal": 10,
        "timeSpent": 215122,
        "attempts": 7,
        "ratingScore": 0
      }
    }]
  };
  const response = serializer.normalizeQueryRecordResponse('any store', 'performance/unit-performance', payload);

  assert.deepEqual(response, expected, 'Wrong response');
});






