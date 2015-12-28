import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:performance/performance', 'Unit | Serializer | performance/performance');

test('normalizeQueryRecordResponse', function(assert) {
  const serializer = this.subject();
  const payload = {
    "content": [{
      "collectionCount": 0,
      "gooruOId": "0619777a-45fa-4bfe-b800-40b2ab158c7a",
      "assessmentCount": 0,
      "collectionsViewed": 0,
      "type": "unit",
      "url": null,
      "totalStudyTime": 0,
      "title": "Quiz :: Indian History",
      "thumbnail": null,
      "sequence": 1,
      "scoreInPercentage": 0,
      "questionType": null,
      "assessmentsAttempted": 0
    }],
    "message": null,
    "paginate": null
  };
  const expected = {
    "data": [{
      "id": "0619777a-45fa-4bfe-b800-40b2ab158c7a",
      "type": "performance/performance",
      "attributes": {
        "title": "Quiz :: Indian History",
        "type": "unit",
        "score": 0,
        "completionDone": 0,
        "completionTotal": 1,
        "timeSpent": 0,
        "ratingScore": 0,
        "attempts": 0
      }
    }]
  };
  const response = serializer.normalizeQueryRecordResponse('any store', 'performance/performance', payload);

  assert.deepEqual(response, expected, 'Wrong response');
});
