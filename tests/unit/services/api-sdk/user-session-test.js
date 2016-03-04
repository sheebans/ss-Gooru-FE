import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import Context from 'gooru-web/models/result/context';

moduleForService('service:api-sdk/user-session', 'Unit | Service | api-sdk/user-session', {
  needs: ['serializer:user-session', 'model:result/context', 'adapter:user-session']
});

test('getCompletedSessions', function (assert) {
  const service = this.subject();

  const response = {
    "content":[
      {
        "sequence":1,
        "eventTime":1,
        "sessionId":"session-1"
      },
      {
        "sequence":2,
        "eventTime":1,
        "sessionId":"session-2"
      }
    ]
  };

  service.set('userSessionAdapter', Ember.Object.create({
    queryRecord: function(query){
      assert.deepEqual(query, {
        collectionType: 'collectionType',
        classId: 'classId',
        courseId: 'courseId',
        userId: 'userId',
        unitId: 'unitId',
        lessonId: 'lessonId',
        contentId: 'contentId',
        openSession: false
      }, "Error");
      return Ember.RSVP.resolve(response);
    }
  }));

  service.set('userSessionSerializer', Ember.Object.create({
    serializeSessionAssessments: function(payload){
      assert.deepEqual(payload, {
        "content":[
          {
            "sequence":1,
            "eventTime":1,
            "sessionId":"session-1"
          },
          {
            "sequence":2,
            "eventTime":1,
            "sessionId":"session-2"
          }
        ]
      }, "Error");
      return [];
    }
  }));

  const routes = function () {
    this.get('/api/nucleus-insights/v2/collectionType/contentId/sessions?userUid=userId&classGooruId=classId&courseGooruId=courseId&unitGooruId=unitId&lessonGooruId=lessonId&openSession=openSession', function () {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  const context = Context.create({
    collectionType: 'collectionType',
    classId: 'classId',
    courseId: 'courseId',
    userId: 'userId',
    unitId: 'unitId',
    lessonId: 'lessonId',
    collectionId: 'contentId'
  });

  var done = assert.async();
  const promise = service.getCompletedSessions(context);
  promise.then(function(){
    done();
  });
});


test('getOpenSession', function (assert) {
  const service = this.subject();

  const response = {
    "content":{
        "sequence":1,
        "eventTime":1,
        "sessionId":"session-1"
      }
  };

  service.set('userSessionAdapter', Ember.Object.create({
    queryRecord: function(query){
      assert.deepEqual(query, {
        collectionType: 'collectionType',
        classId: 'classId',
        courseId: 'courseId',
        userId: 'userId',
        unitId: 'unitId',
        lessonId: 'lessonId',
        contentId: 'contentId',
        openSession: true
      }, "Error");
      return Ember.RSVP.resolve(response);
    }
  }));

  service.set('userSessionSerializer', Ember.Object.create({
    serializeOpenAssessment: function(payload){
      assert.deepEqual(payload, {
        "content":{
            "sequence":1,
            "eventTime":1,
            "sessionId":"session-1"
          }
      }, "Error");
      return [];
    }
  }));

  const routes = function () {
    this.get('/api/nucleus-insights/v2/collectionType/contentId/sessions?userUid=userId&classGooruId=classId&courseGooruId=courseId&unitGooruId=unitId&lessonGooruId=lessonId&openSession=openSession', function () {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify(response)];
    }, 0);
  };

  this.pretender.map(routes);

  const context = Context.create({
    collectionType: 'collectionType',
    classId: 'classId',
    courseId: 'courseId',
    userId: 'userId',
    unitId: 'unitId',
    lessonId: 'lessonId',
    collectionId: 'contentId'
  });

  var done = assert.async();
  const promise = service.getOpenSession(context);
  promise.then(function(){
    done();
  });
});
