import Ember from 'ember';
import {getQuestionUtil} from 'gooru-web/config/question';
import Env from '../../config/environment';
const ConfigEvent = Env['events'] || {};

export default Ember.Object.extend({

  serializeCollection: function(assessment, context, apiKey){
    let serializer = this;
    let contextObject = serializer.getContextValues(context);
    contextObject.clientSource =  "web";
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

  serializeResource: function(questionResult, context, apiKey){
    let serializer = this;
    let question = questionResult.get('question');
    let util = getQuestionUtil(question.get("questionType")).create({ question: question });
    let contextObject = serializer.getContextValues(context);
    contextObject.resourceType = context.get('resourceType');
    let userAnswer = questionResult.get("userAnswer");
    return [{
      "eventId": questionResult.get('uuid'),
      "eventName": "collection.resource.play",
      "session": {"apiKey": apiKey, "sessionId": questionResult.get('uuid')},
      "startTime": questionResult.get('startedAt'),
      "endTime": questionResult.get('submittedAt'),
      "user": {"gooruUId": context.get('userId')},
      "context": contextObject,
      "version": {"logApi": ConfigEvent.apiVersion},
      "metrics": {},
      "payLoadObject": {
        "questionType": questionResult.get('question.type'),
        "attemptStatus": questionResult.get('question.attemptStatus'),
        "answerObject": userAnswer ? util.toAnswerObjects(userAnswer) : {},
        "isStudent": true,
        "taxonomyIds": []
      }
    }];
  },

  getContextValues: function(context){
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
