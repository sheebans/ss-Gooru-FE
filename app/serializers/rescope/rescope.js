import Ember from 'ember';

/**
 * Serializer to support Rescope Operations
 *
 * @typedef {Object} RescopeSerializer
 */
export default Ember.Object.extend({
  /**
   * @function normalizeSkippedContents
   * Method to normalize skipped contents
   */
  normalizeSkippedContents(payload) {
    let skippedContents = Ember.A();
    if (payload) {
      skippedContents = payload;
    }
    return skippedContents;
  }
});
