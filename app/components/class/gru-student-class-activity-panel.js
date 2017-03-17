import Ember from 'ember';

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
    'visible:visibility_on:visibility_off',
    'item.isAssessment:assessment:collection',
    'item.visible:item-enabled:item-disabled',
    'item.isOnAir:on-air'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {ClassActivity}
   */
  classActivity: null,

  /**
   * @property {Collection/Assessment} item
   */
  item: Ember.computed.alias('classActivity.collection'),

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: Ember.computed.alias('classActivity.activityPerformanceSummary.collectionPerformanceSummary'),

  /**
   * @property {boolean}
   */
  visible: Ember.computed.alias('classActivity.isActive')

});
