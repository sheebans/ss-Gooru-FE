import AnalyticsSerializer from 'gooru-web/serializers/analytics/analytics';
import RealTimeSerializer from 'gooru-web/serializers/real-time/real-time';

export default {
  name: 'serializers',
  initialize: function(application) {
    application.register('serializer:analytics', AnalyticsSerializer, { singleton: false } );
    application.register('serializer:real-time', RealTimeSerializer, { singleton: false } );

    application.inject('service:api-sdk/analytics', 'analyticsSerializer', 'serializer:analytics');
    application.inject('service:api-sdk/real-time', 'realTimeSerializer', 'serializer:real-time');
    application.inject('controller:class/reports/collection', 'realTimeSerializer', 'serializer:real-time');
  }
};
