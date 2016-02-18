import Ember from "ember";
import Env from 'gooru-web/config/environment';

// TODO: Remove once the real time serializer is implemented
import UserResourcesResult from 'gooru-web/models/result/user-resources';
import QuestionResult from 'gooru-web/models/result/question';

/**
 *
 * Controller for collection/assessment report
 *
 * Controls the gathering and merging of class performance data
 * for a collection/assessment
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('class'),

  realTimeService: Ember.inject.service('api-sdk/real-time'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    setAnonymous: function () {
      this.set("anonymous", !this.get("anonymous"));
    }
  },


  // -------------------------------------------------------------------------
  // Events

  init: function () {
    var socket = new SockJS(Env['real-time'].webSocketUrl);
    this.set('webSocketClient', Stomp.over(socket));
  },

  willDestroy: function () {
    const webSocketClient = this.get('webSocketClient');
    if (webSocketClient !== null) {
      webSocketClient.disconnect();
    }
    this.set('webSocketClient', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean}
   */
  anonymous: false,

  /**
   * @property {Collection} assessment
   */
  assessment: null,

  /**
   * @property {ReportData} report data
   */
  reportData: null,

  /**
   * @property {Object} routeParams - URL dynamic route segments
   */
  routeParams: null,

  /**
   * @property {User[]} students
   */
  students: Ember.A([]),

  /**
   * @property { Object } webSocketClient - web socket client for getting live data
   * from the Real Time server
   */
  webSocketClient: null,

  // TODO: Remove once the real time serializer is implemented
  mockLiveData: [
    UserResourcesResult.create({
      "user": "56983a9060a68052c1ed934c",
      "resourceResults": [
        QuestionResult.create({
          "correct": false,
          "resourceId": "569906aa20b7dfae1bcd5262",
          "reaction": 2,
          "timeSpent": 701,
          "userAnswer": 3
        })
      ]
    }),
    UserResourcesResult.create({
      "user": "56983a9060a68052c1ed934c",
      "resourceResults": [
        QuestionResult.create({
          "correct": true,
          "resourceId": "569906aa3ec3bb39969acbe6",
          "reaction": 4,
          "timeSpent": 1333,
          "userAnswer": "1"
        })
      ]
    }),
    UserResourcesResult.create({
      "user": "56983a9060a68052c1ed934c",
      "resourceResults": [
        QuestionResult.create({
          "correct": false, //skipped, because is missing user answer
          "resourceId": "569906aadfa0072204f7c7c7",
          "reaction": 5,
          "timeSpent": 1305
        })
      ]
    }),
    UserResourcesResult.create({
      "user": "56983a9060a68052c1ed934c",
      "resourceResults": [
        QuestionResult.create({
          "correct": true,
          "resourceId": "569906aa20b7dfae1bcd5262",
          "reaction": 1,
          "timeSpent": 1013,
          "userAnswer": ["red", "white"]
        })
      ]
    }),
    UserResourcesResult.create({
      "user": "56983a9060a68052c1ed934c",
      "isAttemptStarted": true,
      "resourceResults": [
        QuestionResult.create({
          "correct": false,
          "resourceId": "569906aa20b7dfae1bcd5262",
          "reaction": 3,
          "timeSpent": 2234,
          "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
        })
      ]
    }),
    UserResourcesResult.create({
      "user": "56983a9060a68052c1ed934c",
      "isAttemptFinished": true,
      "resourceResults": [
        QuestionResult.create({
          "correct": true,
          "resourceId": "569906aa3ec3bb39969acbe6",
          "reaction": 2,
          "timeSpent": 1830,
          "userAnswer": ["le", "colo", "teco"]
        })
      ]
    })
  ],


  // -------------------------------------------------------------------------
  // Observers

  /**
   * Observe when the 'reportData' object has been set by the route.
   * At this point, it is possible to proceed with the creation of the websocket
   * to communicate with the real time server and safely merge any initialization
   * data from the real time server as well
   */
  reportDataLoaded: Ember.observer('reportData', function () {
    const webSocketClient = this.get('webSocketClient');
    const controller = this;
    const classId = this.get('routeParams.classId');
    const collectionId = this.get('routeParams.collectionId');
    const channel = classId + '_' + collectionId;

    // TODO: Remove once the real time serializer is implemented
    var messageCounter = 0;

    webSocketClient.connect({}, function () {
      // A web socket connection was made to the RT server. Before subscribing
      // for live messages, a request will be made to fetch any initialization data
      // from the RT server (to avoid overriding data from live messages with init data)
      controller.get('realTimeService').findClassPerformanceByCollection(classId, collectionId)
        .then(function (userResourceResults) {
          // Subscribe to listen for live messages
          webSocketClient.subscribe('/topic/' + channel, function (message) {

            // TODO: Remove once the real time serializer is implemented
            console.log('Message: ' + message);

            var mockLiveData = controller.get('mockLiveData');
            var idx = messageCounter % 6;
            var userResourceResult = mockLiveData[idx];
            messageCounter++;
            controller.get('reportData').merge([userResourceResult]);

          });
          // Merge any init data from the RT server with any
          // previous report data (from analytics)
          controller.get('reportData').merge(userResourceResults);
        });

    }, function () {
      // The web socket connection could not be established so all there is to do is get
      // any initialization data from the RT server. There will be no subsequent data.
      controller.get('realTimeService').findClassPerformanceByCollection(classId, collectionId)
        .then(function (userResourceResults) {
          controller.get('reportData').merge(userResourceResults);
        });
    });
  })


  // -------------------------------------------------------------------------
  // Methods

});
