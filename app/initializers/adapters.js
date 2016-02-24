import AnalyticsAdapter from 'gooru-web/adapters/analytics/analytics';
import RealTimeAdapter from 'gooru-web/adapters/real-time/real-time';
import CollectionResourceAdapter from 'gooru-web/adapters/events/collection-resource-play';
import CollectionPlayAdapter from 'gooru-web/adapters/events/collection-play';

export default {
  name: 'adapters',
  initialize: function(application) {
    application.register('adapter:analytics', AnalyticsAdapter, { singleton: false } );
    application.register('adapter:real-time', RealTimeAdapter, { singleton: false } );
    application.register('adapter:collection-resource-play', CollectionResourceAdapter, { singleton: false } );
    application.register('adapter:collection-play', CollectionPlayAdapter, { singleton: false } );

    application.inject('service:api-sdk/analytics', 'analyticsAdapter', 'adapter:analytics');
    application.inject('service:api-sdk/real-time', 'realTimeAdapter', 'adapter:real-time');
    application.inject('service:api-sdk/events', 'collectionResourceAdapter', 'adapter:collection-resource-play');
    application.inject('service:api-sdk/events', 'collectionPlayAdapter', 'adapter:collection-play');
  }
};
