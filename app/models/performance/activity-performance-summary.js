import PerformanceSummary from './performance-summary';

/**
 * Activity performance summary model
 *
 * @typedef {Object} ActivityPerformanceSummary
 */
export default PerformanceSummary.extend({

  /**
   * @property {Date}
   */
  date: null,

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: null
});
