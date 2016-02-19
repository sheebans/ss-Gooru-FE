import Ember from 'ember';

import UserResourcesResult from 'gooru-web/models/result/user-resources';
import ResourceResult from 'gooru-web/models/result/resource';
import QuestionResult from 'gooru-web/models/result/question';


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
    if (payload.type && payload.type === 'question') {
      return QuestionResult.create({
        resourceId: payload.gooruOId,
        reaction: payload.reaction,
        timeSpent: payload.totalTimespent,
        correct: payload.answerStatus === 'correct',
        userAnswer: null
      });
    } else {
      return ResourceResult.create({
        resourceId: payload.gooruOId,
        reaction: payload.reaction,
        timeSpent: payload.totalTimespent
      });
    }
  }

});
