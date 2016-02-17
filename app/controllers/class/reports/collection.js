import Ember from "ember";
import Env from 'gooru-web/config/environment';

/**
 *
 * Controls the access to the analytics data for a
 * class related to a collection of resources
 *
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

    webSocketClient.connect({}, function () {
      // A web socket connection was made to the RT server. Before subscribing
      // for live messages, a request will be made to fetch any initialization data
      // from the RT server (to avoid overriding data from live messages with init data)
      // After merging the init data with any previous report data (from analytics)
      // a subscription will be made to listen for and merge data from live messages.
      controller.get('realTimeService').findClassPerformanceByCollection(classId, collectionId)
        .then(function (userResourceResults) {
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
