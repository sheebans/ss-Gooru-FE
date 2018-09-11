import Ember from 'ember';
import { PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

/**
 * Student Class Activity Panel
 *
 * Panel that displays a collection/assessment information
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-student-class-activity-panel', 'panel'],

  classNameBindings: [
    'visible:visibility-on:visibility-off',
    'item.isAssessment:assessment:collection'
  ],

  tagName: 'li',

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),
  /**
   * @type AnalyticsService
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  /**
   * @property {Ember.Service} session service
   */
  session: Ember.inject.service('session'),

  /**
   * @property {string}
   */
  activityDateVal: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function externalAssessment open new tab from DCA
     */
    externalAssessment: function(classActivity) {
      let url = classActivity.collection.get('url');
      if (url) {
        window.open(url);
      }
    },
    /**
     * Action triggred when dca report action invoke
     */
    studentDcaReport: function(assessment, studentPerformance) {
      this.sendAction('studentDcaReport', assessment, studentPerformance);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didRender: function() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {ClassActivity}
   */
  classActivity: null,

  /**
   * @property {Class}
   */
  class: null,

  /**
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias(
    'classActivity.activityPerformanceSummary.collectionPerformanceSummary'
  ),
  /**
   * @property {String} source
   */
  source: PLAYER_EVENT_SOURCE.DAILY_CLASS,

  /**
   * @property {boolean}
   */
  visible: Ember.computed.alias('classActivity.isActive')
});
