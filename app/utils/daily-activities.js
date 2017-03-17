import Ember from "ember";
import ActivityPerformanceSummary from 'gooru-web/models/performance/activity-performance-summary';
import CollectionPerformanceSummary from 'gooru-web/models/performance/collection-performance-summary';
import { average, sumAll } from 'gooru-web/utils/math';


/**
 * Aggregates all users class activity summary items
 * @param {Ember.A|ActivityPerformanceSummary[]} activityPerformanceSummaryItems
 * @returns {ActivityPerformanceSummary[]}
 */
export function aggregateClassActivityPerformanceSummaryItems(activityPerformanceSummaryItems) {
  const aggregatedClassActivities = Ember.A([]);
  const dates = activityPerformanceSummaryItems.map((a) => a.get('date').getTime()).uniq();
  dates.forEach(function(date){
    //gets all user activities within the same date
    const activitiesPerDate = activityPerformanceSummaryItems.filter((a) => a.get('date').getTime() === date);
    const dateCollectionPerformanceSummaryItems = activitiesPerDate.mapBy('collectionPerformanceSummary');

    const collectionIds = dateCollectionPerformanceSummaryItems.mapBy('collectionId').uniq();
    collectionIds.forEach(function(collectionId){
      //gets all user performance items for the same collection
      const collectionPerformanceSummaryItems = dateCollectionPerformanceSummaryItems.filterBy('collectionId', collectionId);
      const aggregatedActivity = ActivityPerformanceSummary.create({
        date : new Date(date),
        collectionPerformanceSummary: aggregateCollectionPerformanceSummaryItems(collectionPerformanceSummaryItems)
      });
      aggregatedClassActivities.pushObject(aggregatedActivity);
    });
  });
  return aggregatedClassActivities;
};

/**
 * Aggregates all users collection activity summary items
 * @param {CollectionPerformanceSummary[]} collectionPerformanceSummaryItems
 * @returns {CollectionPerformanceSummary}
 */
export function aggregateCollectionPerformanceSummaryItems(collectionPerformanceSummaryItems) {
  const timeSpentValues = collectionPerformanceSummaryItems.map((a) => a.get('timeSpent') || 0);
  const scoreValues = collectionPerformanceSummaryItems.map((a) => a.get('score') || 0);
  const attempts = collectionPerformanceSummaryItems.map((a) => a.get('attempts') || 0);
  const collectionId = collectionPerformanceSummaryItems[0].get("collectionId");
  return CollectionPerformanceSummary.create({
    collectionId: collectionId,
    timeSpent: sumAll(timeSpentValues),
    score: average(scoreValues),
    attempts: sumAll(attempts)
  });
};
