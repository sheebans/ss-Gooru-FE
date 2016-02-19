import AnalyticsAdapter from 'gooru-web/adapters/analytics/analytics';
import RealTimeAdapter from 'gooru-web/adapters/real-time/real-time';

export default {
  name: 'adapters',
  initialize: function(application) {
    application.register('adapter:analytics', AnalyticsAdapter, { singleton: false } );
    application.register('adapter:real-time', RealTimeAdapter, { singleton: false } );

    application.inject('service:api-sdk/analytics', 'analyticsAdapter', 'adapter:analytics');
    application.inject('service:api-sdk/real-time', 'realTimeAdapter', 'adapter:real-time');
  }
};
