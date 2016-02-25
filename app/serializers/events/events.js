import Ember from 'ember';
import {getQuestionUtil} from 'gooru-web/config/question';
import Env from '../../config/environment';
const ConfigEvent = Env['events'] || {};

export default Ember.Object.extend({

  serializeCollection: function (assessment, context, apiKey) {
    let serializer = this;
    let contextObject = serializer.getContextValues(context);
    contextObject.clientSource = "web";
    contextObject.totalQuestionsCount = serializer.get('totalQuestionsCount');
    return [{
      "eventId": assessment.get('uuid'),
      "eventName": "collection.play",
      "session": {"apiKey": apiKey, "sessionId": assessment.get('uuid')},
      "startTime": assessment.get('startedAt'),
      "endTime": assessment.get('submittedAt'),
      "user": {"gooruUId": context.get('userId')},
      "context": contextObject,
      "version": {"logApi": ConfigEvent.apiVersion},
      "metrics": {},
      "payLoadObject": {"gradingType": "System", "isStudent": true}
    }];
  },

  /**
   * Serialize a result
   * @param {ResourceResult} resourceResult
   * @param {Context} context
   * @param {string} apiKey
   * @returns {*[]}
   */
  serializeResource: function (resourceResult, context, apiKey) {
    let serializer = this;
    let resource = resourceResult.get("resource");
    let contextObject = serializer.getContextValues(context);
    contextObject.resourceType = context.get('resourceType');

    let serialized = {
      "eventId": resourceResult.get('uuid'),
      "eventName": "collection.resource.play",
      "session": {"apiKey": apiKey, "sessionId": resourceResult.get('uuid')},
      "startTime": resourceResult.get('startedAt'),
      "endTime": resourceResult.get('submittedAt'),
      "user": {"gooruUId": context.get('userId')},
      "context": contextObject,
      "version": {"logApi": ConfigEvent.apiVersion},
      "metrics": {}
    };

    if (resource.get("isQuestion")) {
      let question = resourceResult.get('question');
      let util = getQuestionUtil(question.get("questionType")).create({question: question});
      let userAnswer = resourceResult.get("userAnswer");
      serialized.payLoadObject = {
        "questionType": resourceResult.get('question.type'),
        "attemptStatus": resourceResult.get('question.attemptStatus'),
        "answerObject": userAnswer ? util.toAnswerObjects(userAnswer) : {},
        "isStudent": true,
        "taxonomyIds": []
      };
    }
    else{
      serialized.payLoadObject = { //TODO looks for resource parameters
        "attemptStatus": resourceResult.get('question.attemptStatus'),
        "isStudent": true,
        "taxonomyIds": []
      };
    }
    return [serialized];
  },

  /**
   * Gets context values
   * @param context
   * @returns {*}
   */
  getContextValues: function (context) {
    return {
      "contentGooruId": context.get('resourceId'),
      "parentGooruId": context.get('collectionId'),
      "classGooruId": context.get('classId'),
      "parentEventId": context.get('parentEventId'),
      "type": context.get('eventType'),
      "courseGooruId": context.get('courseId'),
      "unitGooruId": context.get('unitId'),
      "lessonGooruId": context.get('lessonId'),
      "collectionType": context.get('collectionType')
    };
  }

});
