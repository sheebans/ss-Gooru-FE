import Ember from 'ember';
import {getQuestionUtil} from 'gooru-web/config/question';
import Env from '../../config/environment';
const ConfigEvent = Env['events'] || {};

export default Ember.Object.extend({

  /**
   * Serializes a assessment result
   * @param {AssessmentResult} assessment
   * @param {Context} context
   * @param {string} apiKey
   * @returns {*[]}
   */
  serializeCollection: function (assessment, context, apiKey) {
    let serializer = this;
    let totalResources = assessment.get("totalResources");
    let contextObject = serializer.getContextValuesForCollection(context, totalResources);
    return [{
      "eventId": context.get('parentEventId'),
      "eventName": "collection.play",
      "session": {"apiKey": apiKey, "sessionId": context.get('sessionId')},
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
   * Serializes a result
   * @param {ResourceResult} resourceResult
   * @param {Context} context
   * @param {string} apiKey
   * @returns {*[]}
   */
  serializeResource: function (resourceResult, context, apiKey) {
    let serializer = this;
    let resource = resourceResult.get("resource");
    let resourceType = resource.get("isQuestion") ? 'question' : 'resource'
    let contextObject = serializer.getContextValuesForResult(context, resource.get("id"), resourceType);

    let serialized = {
      "eventId": context.get('resourceEventId'),
      "eventName": "collection.resource.play",
      "session": {"apiKey": apiKey, "sessionId": context.get('sessionId')},
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
        "questionType": resourceResult.get('question.questionType'),
        "attemptStatus": resourceResult.get('question.attemptStatus'),
        "answerObject": userAnswer ? util.toAnswerObjects(userAnswer) : {},
        "isStudent": true,
        "taxonomyIds": []
      };
    }
    else{
      serialized.payLoadObject = { //TODO looks for resource parameters
        "isStudent": true,
        "taxonomyIds": []
      };
    }
    return [serialized];
  },

  /**
   * Gets context values
   * @param {Context} context
   * @param {string} resourceType question|resource
   * @returns {*}
   */
  getContextValuesForResult: function (context, resourceId, resourceType) {
    return {
      "contentGooruId": resourceId,
      "parentGooruId": context.get('collectionId'),
      "classGooruId": context.get('classId'),
      "parentEventId": context.get('parentEventId'),
      "type": context.get('eventType'),
      "courseGooruId": context.get('courseId'),
      "unitGooruId": context.get('unitId'),
      "lessonGooruId": context.get('lessonId'),
      "collectionType": context.get('collectionType'),
      "resourceType": resourceType,
      "clientSource": "web"
    };
  },

  /**
   * Gets context values for collection
   * @param {Context} context
   * @param {number} questionCount
   * @returns {*}
   */
  getContextValuesForCollection: function (context, questionCount) {
    return {
      "type": context.get('eventType'),
      "contentGooruId": context.get('collectionId'),
      "classGooruId": context.get('classId'),
      "courseGooruId": context.get('courseId'),
      "unitGooruId": context.get('unitId'),
      "lessonGooruId": context.get('lessonId'),
      "collectionType": context.get('collectionType'),
      "questionCount": questionCount,
      "clientSource": "web"
    };
  }

});
