import Ember from 'ember';

/**
 * Class Collection Panel
 *
 * Panel that displays a collection/assessment information
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-collection-panel', 'panel'],

  classNameBindings: ['item.isAssessment:assessment:collection', 'item.visible:item-enabled:item-disabled', 'item.isOnAir:on-air'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function setOnAir
     */
    //setOnAir: function () {
    //
    //},
    /**
     * @function changeVisibility
     */
    changeVisibility:function (){
      Ember.log('changeVisibility');

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
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([Ember.Object.create({
    'label': "On",
    'value': true
  }),Ember.Object.create({
    'label': "Off",
    'value': false
  })])

});
