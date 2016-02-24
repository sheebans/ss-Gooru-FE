import { moduleFor, test } from 'ember-qunit';
import Context from 'gooru-web/models/result/context';

moduleFor('serializer:events/events', 'Unit | Serializer | events/events');

test('normalizeFindRecordResponse', function(assert) {
   const serializer = this.subject();

   let context = Context.create({
      userId:"user-id",
      resourceId: "resource-id",
      collectionId: "collection-id",
      classId: "class-id",
      parentEventId: "parent-id",
      resourceType: "resource",
      courseId: "course-id",
      unitId:"unit-id",
      lessonId: "b479f7cd-52af-4b41-a8e5-fbd4b899b099",
      collectionType:"collection"
   });


  const expected = [{
    "eventId": null,
    "eventName": "collection.resource.play",
    "session": {"apiKey": "api-key-1", "sessionId": null},
    "startTime": "2016",
    "endTime": null,
    "user": {"gooruUId": "user-id"},
    "context": {
      "contentGooruId": "content-id",
      "parentGooruId": "parent-id",
      "classGooruId": "class-id",
      "parentEventId": "parent-id",
      "type": "start",
      "courseGooruId": "course-id",
      "unitGooruId": "unit-id",
      "lessonGooruId": "lesson-id",
      "collectionType": "collection",
      "resourceType": "resource"
    },
    "version": {"logApi": "3.0"},
    "metrics": {},
    "payLoadObject": {
      "answerObject": [{"text": null, "status": null, "order": 0, "answerId": 0, "skip": false}],
      "isStudent": true,
      "taxonomyIds": []
    }
  }];
  const apiKey = 'api-key-1';
  const response = serializer.serializeResource(assessment, context, apiKey);

  assert.deepEqual(response, expected, 'Wrong response');
});
