import Ember from 'ember';
import ActivityPerformanceSummary from 'gooru-web/models/performance/activity-performance-summary';
import { parseDate } from 'gooru-web/utils/utils';
import CollectionPerformanceSummarySerializer from 'gooru-web/serializers/performance/collection-performance-summary';

/**
 * Serializer to support the CollectionPerformanceSummary CRUD operations
 *
 * @typedef {Object} CollectionPerformanceSummary
 */
export default Ember.Object.extend({

  /**
   * @property {CollectionPerformanceSummarySerializer}
   */
  collectionPerformanceSummarySerializer: null,


  // -------------------------------------------------------------------------
  // Events

  init: function () {
    this._super(...arguments);
    this.set('collectionPerformanceSummarySerializer', CollectionPerformanceSummarySerializer.create(Ember.getOwner(this).ownerInjection()));
  },


  /**
   * Normalize an array of CollectionPerformanceSummary
   *
   * @param payload endpoint response format in JSON format
   * @returns {CollectionPerformanceSummary[]}
   */
  normalizeAllActivityPerformanceSummary: function(payload) {
    const serializer = this;
    if (payload && Ember.isArray(payload.usageData)) {
      return payload.usageData.map(function(activityPerformanceSummary) {
        return serializer.normalizeActivityPerformanceSummary(activityPerformanceSummary);
      });
    } else {
      return [];
    }
  },

  /**
   * Normalize a CollectionPerformanceSummary
   * @param {*} data
   * @return {CollectionPerformanceSummary}
   */
  normalizeActivityPerformanceSummary: function (data) {
    const serializer = this;
    return ActivityPerformanceSummary.create({
      date: parseDate(data.date, 'YYYY-MM-DD'),
      collectionPerformanceSummary: serializer.get('collectionPerformanceSummarySerializer').normalizeCollectionPerformanceSummary(data)
    });
  }

});
