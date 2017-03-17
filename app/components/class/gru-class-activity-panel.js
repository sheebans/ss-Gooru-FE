import Ember from 'ember';

/**
 * Class Activity Panel
 *
 * Panel that displays a collection/assessment information
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-activity-panel', 'panel'],

  classNameBindings: ['item.isAssessment:assessment:collection', 'item.visible:item-enabled:item-disabled', 'item.isOnAir:on-air'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function changeVisibility
     */
    changeVisibility:function (collectionId){
      this.sendAction('onChangeVisibility', collectionId);
    },

    /**
     * @function goLive
     */
    goLive: function (collectionId) {
      this.sendAction('onGoLive', collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didRender: function() {
    this.$('[data-toggle="tooltip"]').tooltip();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Collection/Assessment} item
   */
  item: null,

  /**
   * @property {CollectionPerformanceSummary}
   */
  collectionPerformanceSummary: null,

  /**
   * @property {string} go live action name
   */
  onGoLive: 'goLive',

  /**
   * @property {string} changeVisibility action name
   */
  onChangeVisibility: 'changeVisibility'

});
