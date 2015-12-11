import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:performance/student-lesson-performance', 'Unit | Serializer | performance/student-lesson-performance');

test('normalizeQueryRecordResponse', function(assert) {
  const serializer = this.subject();
  const payload = {
    "content": [{
      "title": "Buddisum",
      "thumbnail": null,
      "gooruOId": "2cd0cb03-91f6-4a8f-b799-2f04039e02c5",
      "scoreStatus": "NotAttempted",
      "views": 0,
      "sequence": 1,
      "item": [{
        "title": "General Knowledge Indian History",
        "thumbnail": "http:////qacdn.gooru.org/qalive//f000/2429/2304//",
        "gooruOId": "0c5cd8aa-d023-4672-9598-f4f527df4760",
        "views": 0,
        "sequence": 2,
        "scoreInPercentage": 0,
        "questionType": null,
        "timeSpent": 0,
        "type": "collection",
        "url": null
      }, {
        "title": "Quiz 2 : GK",
        "thumbnail": "http:////qacdn.gooru.org/qalive//f000/2429/7049//",
        "gooruOId": "792c05b3-2214-4627-acef-22f8d5ed394a",
        "views": 0,
        "sequence": 3,
        "scoreInPercentage": 0,
        "questionType": null,
        "timeSpent": 0,
        "type": "assessment",
        "url": null
      }, {
        "title": "Quiz : GK",
        "thumbnail": "http:////qacdn.gooru.org/qalive//f000/2429/2561//",
        "gooruOId": "bc116a9b-7252-45e0-96df-2f786d6a5da3",
        "views": 0,
        "sequence": 1,
        "scoreInPercentage": 0,
        "questionType": null,
        "timeSpent": 0,
        "type": "assessment",
        "url": null
      }],
      "scoreInPercentage": 0,
      "questionType": null,
      "timeSpent": 0,
      "type": "lesson",
      "url": null
    }],
    "message": null,
    "paginate": null
  };
  const expected = {
    "data": [
      {
        "id": "2cd0cb03-91f6-4a8f-b799-2f04039e02c5",
        "type": "performance/student-lesson-performance",
        "attributes": {
          "title": "Buddisum",
          "type": "lesson",
          "score": 0,
          "completionDone": 0,
          "completionTotal": 1,
          "timeSpent": 0,
          "ratingScore": 0,
          "attempts": 0
        },
        "relationships": {
          "collections": {
            "data": [
              {
                "id": "0c5cd8aa-d023-4672-9598-f4f527df4760",
                "type": "performance/student-performance"
              },
              {
                "id": "792c05b3-2214-4627-acef-22f8d5ed394a",
                "type": "performance/student-performance"
              },
              {
                "id": "bc116a9b-7252-45e0-96df-2f786d6a5da3",
                "type": "performance/student-performance"
              }
            ]
          }
        }
      }
    ],
    "included": [
      {
        "id": "0c5cd8aa-d023-4672-9598-f4f527df4760",
        "type": "performance/student-performance",
        "attributes": {
          "title": "General Knowledge Indian History",
          "type": "collection",
          "score": 0,
          "completionDone": 0,
          "completionTotal": 1,
          "timeSpent": 0,
          "ratingScore": 0,
          "attempts": 0
        }
      },
      {
        "id": "792c05b3-2214-4627-acef-22f8d5ed394a",
        "type": "performance/student-performance",
        "attributes": {
          "title": "Quiz 2 : GK",
          "type": "assessment",
          "score": 0,
          "completionDone": 0,
          "completionTotal": 1,
          "timeSpent": 0,
          "ratingScore": 0,
          "attempts": 0
        }
      },
      {
        "id": "bc116a9b-7252-45e0-96df-2f786d6a5da3",
        "type": "performance/student-performance",
        "attributes": {
          "title": "Quiz : GK",
          "type": "assessment",
          "score": 0,
          "completionDone": 0,
          "completionTotal": 1,
          "timeSpent": 0,
          "ratingScore": 0,
          "attempts": 0
        }
      }
    ]
  };
  const response = serializer.normalizeQueryRecordResponse('any store', 'performance/student-lesson-performance', payload);

  assert.deepEqual(response, expected, 'Wrong response');
});

test('getNormalizedPerformanceAttributes', function(assert) {
  const serializer = this.subject();
  const payload = {
    "title": "General Knowledge Indian History",
    "thumbnail": "http:////qacdn.gooru.org/qalive//f000/2429/2304//",
    "gooruOId": "0c5cd8aa-d023-4672-9598-f4f527df4760",
    "views": 0,
    "sequence": 2,
    "scoreInPercentage": 0,
    "questionType": null,
    "timeSpent": 0,
    "type": "collection",
    "url": null
  };
  const expected = {
    "title": "General Knowledge Indian History",
    "type": "collection",
    "score": 0,
    "completionDone": 0,
    "completionTotal": 1,
    "timeSpent": 0,
    "ratingScore": 0,
    "attempts": 0
  };
  const response = serializer.getNormalizedPerformanceAttributes(payload);

  assert.deepEqual(response, expected, 'Wrong response');
});

test('normalizeCollections', function(assert) {
  const serializer = this.subject();
  const payload = [
      {
      "title": "General Knowledge Indian History",
      "thumbnail": "http:////qacdn.gooru.org/qalive//f000/2429/2304//",
      "gooruOId": "0c5cd8aa-d023-4672-9598-f4f527df4760",
      "views": 0,
      "sequence": 2,
      "scoreInPercentage": 0,
      "questionType": null,
      "timeSpent": 0,
      "type": "collection",
      "url": null
    },
    {
      "title": "Quiz 2 : GK",
      "thumbnail": "http:////qacdn.gooru.org/qalive//f000/2429/7049//",
      "gooruOId": "792c05b3-2214-4627-acef-22f8d5ed394a",
      "views": 0,
      "sequence": 3,
      "scoreInPercentage": 0,
      "questionType": null,
      "timeSpent": 0,
      "type": "assessment",
      "url": null
    },
    {
      "title": "Quiz : GK",
      "thumbnail": "http:////qacdn.gooru.org/qalive//f000/2429/2561//",
      "gooruOId": "bc116a9b-7252-45e0-96df-2f786d6a5da3",
      "views": 0,
      "sequence": 1,
      "scoreInPercentage": 0,
      "questionType": null,
      "timeSpent": 0,
      "type": "assessment",
      "url": null
    }
  ];
  const expectedPerformanceItem = {
    "id": "1",
    "type": "performance/student-lesson-performance",
    "attributes": {},
    "relationships": {
      "collections": {
        "data": [
          {
            "id": "0c5cd8aa-d023-4672-9598-f4f527df4760",
            "type": "performance/student-performance"
          },
          {
            "id": "792c05b3-2214-4627-acef-22f8d5ed394a",
            "type": "performance/student-performance"
          },
          {
            "id": "bc116a9b-7252-45e0-96df-2f786d6a5da3",
            "type": "performance/student-performance"
          }
        ]
      }
    }
  };
  const expectedModel = {
    "data": [],
    "included": [
      {
        "id": "0c5cd8aa-d023-4672-9598-f4f527df4760",
        "type": "performance/student-performance",
        "attributes": {
          "title": "General Knowledge Indian History",
          "type": "collection",
          "score": 0,
          "completionDone": 0,
          "completionTotal": 1,
          "timeSpent": 0,
          "ratingScore": 0,
          "attempts": 0
        }
      },
      {
        "id": "792c05b3-2214-4627-acef-22f8d5ed394a",
        "type": "performance/student-performance",
        "attributes": {
          "title": "Quiz 2 : GK",
          "type": "assessment",
          "score": 0,
          "completionDone": 0,
          "completionTotal": 1,
          "timeSpent": 0,
          "ratingScore": 0,
          "attempts": 0
        }
      },
      {
        "id": "bc116a9b-7252-45e0-96df-2f786d6a5da3",
        "type": "performance/student-performance",
        "attributes": {
          "title": "Quiz : GK",
          "type": "assessment",
          "score": 0,
          "completionDone": 0,
          "completionTotal": 1,
          "timeSpent": 0,
          "ratingScore": 0,
          "attempts": 0
        }
      }
    ]
  };
  var performanceItem = {
    id: '1',
    type: "performance/student-lesson-performance",
    attributes: {},
    relationships: {
      collections: { data: [] }
    }
  };
  var model = {
    data: [],
    included: []
  };
  serializer.normalizeCollections(payload, performanceItem, model);

  assert.deepEqual(performanceItem, expectedPerformanceItem, 'Wrong porformance item response');
  assert.deepEqual(model, expectedModel, 'Wrong model response');
});

