import StudentCollection from 'gooru-web/controllers/reports/student-collection';
import { SUGGESTION_TYPE } from 'gooru-web/config/config';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default StudentCollection.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader: function (toggleState) {
      this.set('toggleState', toggleState);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Collection} collection
   */
  collection: null,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   *Back fill pre test suggestion
   * @property {String} typeSuggestion
   */
  typeSuggestion: SUGGESTION_TYPE.bf_preT
});
