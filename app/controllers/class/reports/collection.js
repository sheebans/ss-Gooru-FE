import Ember from "ember";
import Env from 'gooru-web/config/environment';


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

    webSocketClient.connect({}, function () {
      // A web socket connection was made to the RT server. Before subscribing
      // for live messages, a request will be made to fetch any initialization data
      // from the RT server (to avoid overriding data from live messages with init data)

      controller.get('realTimeService').findResourcesByCollection(classId, collectionId)
        .then(function (userResourceResults) {
          // Subscribe to listen for live messages
          webSocketClient.subscribe('/topic/' + channel, function(message) {
            var eventMessage = JSON.parse(message.body);
            const userResourceResult = controller.get('realTimeSerializer').normalizeRealTimeEvent(eventMessage);
            controller.get('reportData').merge([userResourceResult]);
          });
          // Merge any init data from the RT server with any
          // previous report data (from analytics)
          controller.get('reportData').merge(userResourceResults);
        });

    }, function () {
      // The web socket connection could not be established so all there is to do is get
      // any initialization data from the RT server. There will be no subsequent data.
      controller.get('realTimeService').findResourcesByCollection(classId, collectionId)
        .then(function (userResourceResults) {
          controller.get('reportData').merge(userResourceResults);
        });
    });
  })


  // -------------------------------------------------------------------------
  // Methods

});
