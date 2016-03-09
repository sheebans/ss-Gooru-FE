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

  queryParams: ['anonymous'],


  // -------------------------------------------------------------------------
  // Dependencies

  i18n: Ember.inject.service(),

  notifications: Ember.inject.service(),

  realTimeService: Ember.inject.service('api-sdk/real-time'),


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    goBack: function () {
      this.send('navigateBack');
    },

    launchAnonymous: function () {
      var url = window.location.href;

      url += "?anonymous=true";
      window.open(url, 'realTimeAnonymous', 'width=' + window.screen.width + ', height=' + window.screen.height + ', left=0, top=0, scrollbars=1', true);
    }
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
   * @property {boolean} is a notification regarding the connection currently being displayed
   */
  isNotificationDisplayed: false,

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
    const controller = this;
    const classId = this.get('routeParams.classId');
    const collectionId = this.get('routeParams.collectionId');
    const channel = classId + '_' + collectionId;
    const reportData = this.get('reportData');
    var connectAttemptDelay = 1000;

    function connectWithWebSocket() {

      // Create a new web socket connection
      let url = location.host + Env['real-time'].webSocketUrl;
      let socket = new SockJS(url);
      let webSocketClient = Stomp.over(socket);
      webSocketClient.heartbeat.outgoing = 5000;  // 5 second heart-beat to the server
      webSocketClient.heartbeat.incoming = 5000;  // 5 second heart-beat from the server

      controller.set('webSocketClient', webSocketClient);

      webSocketClient.connect({}, function () {

        // Clear a failed connection notification, if there was one
        controller.clearNotification();
        connectAttemptDelay = 1000;

        // A web socket connection was made to the RT server. Before subscribing
        // for live messages, a request will be made to fetch any initialization data
        // from the RT server (to avoid overriding data from live messages with init data)
        controller.get('realTimeService').findResourcesByCollection(classId, collectionId)
          .then(function (userResourceResults) {

            // Subscribe to listen for live messages
            webSocketClient.subscribe('/topic/' + channel, function (message) {
              var eventMessage = JSON.parse(message.body);
              const userResourceResult = controller.get('realTimeSerializer').normalizeRealTimeEvent(eventMessage);
              reportData.merge([userResourceResult]);
            });

            // Merge any init data from the RT server with any
            // previous report data
            reportData.merge(userResourceResults);
            });

      }, function (message) {
        controller.showNotification();
        connectAttemptDelay *= 2;
        webSocketClient.disconnect();
        setTimeout(connectWithWebSocket, connectAttemptDelay);
      });
    }

    if (reportData) {
      connectWithWebSocket();
    }
  }),


  // -------------------------------------------------------------------------
  // Methods

  showNotification: function () {
    var isDisplayed = this.get('isNotificationDisplayed');

    if (!isDisplayed) {
      let notifications = this.get('notifications');
      let message = this.get('i18n').t('common.warnings.on-air-connection-lost').string;

      // Use custom options for the notification
      notifications.setOptions({
        closeButton: false,
        newestOnTop: true,
        progressBar: false,
        positionClass: "toast-top-full-width",
        preventDuplicates: false,
        showDuration: 300,
        hideDuration: 1000,
        "timeOut": "0",
        "extendedTimeOut": "0",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      });
      notifications.warning(message);
      this.set('isNotificationDisplayed', true);
    }
  },

  clearNotification: function () {
    this.get('notifications').clear();
    this.set('isNotificationDisplayed', false);
  }

});
