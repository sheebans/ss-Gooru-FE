import Ember from "ember";
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default Ember.Controller.extend(ConfigurationMixin, {

  queryParams: ['classId', 'courseId', 'unitId', 'lessonId', 'collectionId', 'userId', 'type', 'role', 'contextId'],
  // -------------------------------------------------------------------------
  // Dependencies

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
   * @property {string} indicates if it is collection or assessment
   */
  type: null,

  /**
   * @property {string} indicates if it is a student or teacher view
   */
  role: null,

  /**
   * @property {Collection} collection
   */
  collection: null,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true

});
