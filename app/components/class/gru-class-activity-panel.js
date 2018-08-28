import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-class-activity-panel'],

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      this.sendAction('onRemoveClassActivity', classActivity);
    },

    /**
     * @function changeVisibility
     */
    changeVisibility: function() {
      let classActivity = this.get('classActivity');
      this.sendAction('onChangeVisibility', classActivity.get('id'));
    },

    /**
     * @function goLive
     */
    goLive: function(collectionId) {
      this.sendAction('onGoLive', collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

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
   * Toggle Options
   * @property {Ember.Array}
   */
  switchOptions: Ember.A([
    Ember.Object.create({
      label: 'On',
      value: true
    }),
    Ember.Object.create({
      label: 'Off',
      value: false
    })
  ]),

  /**
   * Maintains the flag to show go live or not
   * @type {Boolean}
   */
  showGolive: false,

  /**
   * Maintains the flag to show remove content button or not.
   * @type {Boolean}
   */
  showDcaRemoveButton: false,

  /**
   * Maintains the flag to show assign button or not.
   * @type {Boolean}
   */
  showDcaAssignButton: false
});
