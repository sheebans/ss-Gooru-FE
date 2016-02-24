import AnalyticsSerializer from 'gooru-web/serializers/analytics/analytics';
import UserResourcesResult from 'gooru-web/models/result/user-resources';

export default AnalyticsSerializer.extend({

  normalizeRealTimeEvent: function(payload) {
    const serializer = this;
    return UserResourcesResult.create({
      user: payload.userId,
      resourceResults: serializer.normalizeRealTimeEventContent(payload.event)
    });
  },

  normalizeRealTimeEventContent: function(payload) {
    const serializer = this;
    return [serializer.normalizeResourceResult(payload)];
  }

});
