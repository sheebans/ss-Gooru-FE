import Ember from 'ember';
import { ANONYMOUS_COLOR, STUDY_PLAYER_BAR_COLOR } from 'gooru-web/config/config';

/**
 * Study Player header
 *
 * Component responsible for showing an informative header for the study player.
 * It may embed other components for interacting with the player.
 *
 * @module
 * @see controllers/study-player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {suggestService} Service to retrieve suggest resources
   */
  suggestService: Ember.inject.service('api-sdk/suggest'),

  /**
   * @property {Service} session
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-study-header'],
  classNameBindings: ['toggleState:expanded:collapsed', 'showConfirmation:hidden'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Redirect to course map
     */
    redirectCourseMap(){
      this.get('router').transitionTo('student.class.course-map', this.get('classId'), { queryParams: { refresh: true } });
    },

    /**
     * Go back to collection
     */
    backToCollection() {
      window.location.href = this.get('collectionUrl');
    },

    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader() {
      this.toggleProperty('toggleState');
      this.sendAction('onToggleHeader', this.get('toggleState'));
    },
    /**
     * Action triggered when a suggested resource is clicked
     */
    playSuggested(resource) {
      this.get('router').transitionTo('resource-player',
        this.get('classId'), resource.id, {
          queryParams: {
            collectionUrl: window.location.href
          }
        });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super( ...arguments );
    if(!this.get('collectionUrl')) {
      this.loadContent();
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} collectionUrl
   */
  collectionUrl: null,

  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {String} classId - Class unique Id associated for the collection / assessment.
   */
  classId: null,

  /**
   * @property {collection} collection - The current Collection
   */
  collection: null,

  /**
   * @property {Number} resourceSequence - The resource sequence in the collection / assessment
   */
  resourceSequence: null,

  /**
   * @property {Number} totalResources - The collection / assessment total resources
   */
  totalResources: null,

  /**
   * @property {Array} list of suggested resources of a collection
   */
  suggestedResources: null,

  /**
   * @property {Array} list of breadcrumbs of a collection
   */
  breadcrumbs: null,

  /**
   * @property {String} color - Hex color value for the bar in the bar chart
   */
  color: ANONYMOUS_COLOR,

  /**
   * @property {String} color - Hex color value for the default bgd color of the bar chart
   */
  defaultBarColor: STUDY_PLAYER_BAR_COLOR,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   * Shows if the component is called from collection report
   * @property {Boolean} fromReport
   */
  fromReport: false,

  /**
   * @property {Number} barChartData
   */
  barChartData: Ember.computed('class.performanceSummary', function () {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total = this.get('class.performanceSummary.total');
    const percentage = (completed) ? (completed/total)*100 : 0;

    return [
      {
        color: this.get('color'),
        percentage
      }
    ];
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load Header Content
   */

  loadContent: function(){
    const component = this;
    const classId = component.get('classId');
    const collectionId = component.get('collection.id');
    const totalResources = (component.get('collection.resources')) ? component.get('collection.resources').length : null;

    component.set('totalResources', totalResources);

    component.get('classService').readClassInfo(classId).then(function(aClass) {
      component.get('performanceService').findClassPerformanceSummaryByClassIds([classId])
        .then(function(classPerformanceSummaryItems) {
          aClass.set('performanceSummary', classPerformanceSummaryItems.findBy('classId', classId));
          component.set('class', aClass);
        });
    });

    component.get('suggestService')
      .suggestResourcesForCollection(component.get('session.userId'), collectionId)
      .then(suggestedResources => component.set('suggestedResources', suggestedResources));
  }
});
