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

  classNameBindings: [
    'visible:visibility_on:visibility_off',
    'item.isAssessment:assessment:collection',
    'item.visible:item-enabled:item-disabled',
    'item.isOnAir:on-air',
    'item.isAssessment:li-flow'
  ],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * @function changeVisibility
     */
    changeVisibility: function(classActivity) {
      this.sendAction('onChangeVisibility', classActivity);
    },

    /**
     * @function goLive
     */
    goLive: function(collectionId) {
      this.sendAction('onGoLive', collectionId);
    },
    /**
     * @function goLive
     */
    onReportClick: function(collectionId) {
      this.set('isReportEnabled', true);
      this.set('onCollectionclick', collectionId);
      this.getMembers(collectionId);
    },

    /**
     * @function removeClassActivity
     */
    removeClassActivity: function(classActivity) {
      this.sendAction('onRemoveClassActivity', classActivity);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didRender: function() {
    this._super(...arguments);
    this.$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {ClassActivity}
   */
  classActivity: null,
  /**
   * The header titles
   * @property {classId}
   */

  classId: null,
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),
  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

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
   * @property {boolean}
   */
  visible: Ember.computed.alias('classActivity.isActive'),
  /**
   * The user performanceData
   * @property {membersData[]}
   */
  membersData: [],
  /**
   * The user performanceData
   * @property {firstTierHeaders[]}
   */
  firstTierHeaders: [],
  /**
   * @property {boolean}
   */
  isReportEnabled: false,
  /**
   * @property {string} go live action name
   */
  onCollectionclick: '',

  /**
   * @property {string} go live action name
   */
  onGoLive: 'goLive',

  /**
   * @property {string} changeVisibility action name
   */
  onChangeVisibility: 'changeVisibility',

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
  getMembers: function(collectionId) {
    const component = this;
    const classId = component.get('classId');
    let today = new Date();
    var startDate = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate() - 2}`;

    component
      .get('collectionService')
      .readQuizzesCollection(collectionId, 'assessment', false)
      .then(function(result) {
        Ember.Logger.info('colldata---', result);
        component.set('firstTierHeaders', result.resources);
      });
    component
      .get('collectionService')
      .readPerformanceData(classId, collectionId, startDate)
      .then(function(result) {
        Ember.Logger.info('colldata---', result);
      });

    component
      .get('classService')
      .readClassMembers(classId)
      .then(function(members) {
        Ember.Logger.info('hello members---', members.get('members'));
        component.set('membersData', members.get('members'));
      });
  }
});
