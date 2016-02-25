import Ember from 'ember';

import UserResourcesResult from 'gooru-web/models/result/user-resources';
import ResourceResult from 'gooru-web/models/result/resource';
import QuestionResult from 'gooru-web/models/result/question';
import AnswerObject from 'gooru-web/utils/question/answer-object';
import { getQuestionUtil } from 'gooru-web/config/question';


export default Ember.Object.extend({

  normalizeResponse: function(payload) {
    var realTimeModel = [];
    this.normalizeUserResults(realTimeModel, payload.content);
    return realTimeModel;
  },

  normalizeUserResults: function(model, payload) {
    const serializer = this;
    payload.forEach(function(userResult) {
      this.push(serializer.normalizeUserResult(userResult));
    }, model);
  },

  normalizeUserResult: function(payload) {
    const serializer = this;
    return UserResourcesResult.create({
      user: payload.userUId,
      resourceResults: serializer.normalizeResourceResults(payload.usageData)
    });
  },

  normalizeResourceResults: function(payload) {
    const serializer = this;
    var resourceResults = [];
    payload.forEach(function (resourceResult) {
      this.push(serializer.normalizeResourceResult(resourceResult));
    }, resourceResults);
    return resourceResults;
  },

  normalizeResourceResult: function(payload) {
    let answerObjects = this.normalizeAnswerObjects(payload.answerObjects);
    if (payload.resourceType && payload.resourceType === 'question') {
      let util = getQuestionUtil(payload.questionType).create();

      return QuestionResult.create({
        //Commons fields for real time and student collection performance
        resourceId: payload.gooruOId,
        reaction: payload.reaction,
        timeSpent: payload.timeSpen,
        userAnswer: util.toUserAnswer(answerObjects),

        //fields only for real time
        correct: payload.answerStatus === 'correct',

        //fields only for student collection performance
        score: payload.score,
        resourceType: payload.resourceType,
        attempts: payload.attempts,
        sessionId: payload.sessionId
      });
    } else {
      return ResourceResult.create({
        //Commons fields for real time and student collection performance
        resourceId: payload.gooruOId,
        reaction: payload.reaction,
        timeSpent: payload.timeSpent,

        //fields only for student collection performance
        score: payload.score,
        resourceType: type,
        attempts: payload.attempts,
        sessionId: payload.sessionId
      });
    }
  },

  normalizeAnswerObjects: function(answerObjects){
    answerObjects = answerObjects === "N/A" ? [] : [answerObjects];
    return answerObjects.map(function(answerObject){
      return AnswerObject.create(answerObject);
    })


  }

});
