import Ember from "ember";
import { ASSESSMENT_SHOW_VALUES, RESOURCE_COMPONENT_MAP } from 'gooru-web/config/config';
/**
 * Player viewer
 *
 * Component responsible for showing the appropriate content viewer per content type
 * (i.e. question, pdf file, video, etc.).
 *
 * @module
 * @see controllers/player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-viewer'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /***
     * When the user submits the question
     * @param {Resource} question
     * @param {QuestionResult} questionResult
     * @returns {boolean}
     */
    submitQuestion: function (question, questionResult) {
      const component = this;
      component.$('.content').scrollTop(0);
      component.sendAction("onSubmitQuestion", question, questionResult);
    }
  },


  // -------------------------------------------------------------------------
  // Events
  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    this.calculateResourceContentHeight();
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The resource playing
   * @property {Resource} resource
   */
  resource: null,

  /**
   * The resource or question result playing
   * @property {ResourceResult}
   */
  resourceResult: null,


  /**
   * The collection playing
   * @property {Collection} collection
   */
  collection: null,

  /**
   * @property {string} on submit question action
   */
  onSubmitQuestion: "submitQuestion",

  /** Calculated height designated for the content area of a resource
   * @see components/player/resources/gru-url-resource.js
   * The height of the content area needs to be calculated because the height of the narration varies and may cause a scroll bar to appear
   * @property {Number}
   */
  calculatedResourceContentHeight: 0,

  /**
   * Indicates when the player has context
   * @property {boolean}
   */
  hasContext: false,

  /**
   * Indicates when the collection is already submitted
   * @property {boolean}
   */
  submitted: false,

  /**
   * The resource component selected
   * @property {string}
   */
  resourceComponentSelected: Ember.computed('resource.id', function () {
    const resourceType = (this.get("resource.isImageResource") ? 'image' : this.get('resource.resourceType'));
    var component = RESOURCE_COMPONENT_MAP[resourceType];

    if (!component) {
      Ember.Logger.error('Resources of type ' + resourceType + ' are currently not supported');
    } else {
      Ember.Logger.debug('Resources component selected: ', component);
      return component;
    }
  }),
  // -------------------------------------------------------------------------
  // Observers
  /**
   * Observes for the resource change
   */
  resourceObserver: function() {
    this.calculateResourceContentHeight();
  }.observes("resource.id"),

  /**
   * The text for the submit button
   * @property {string}
   */
  buttonTextKey: Ember.computed('collection', 'resource.id', 'resourceResult.submittedAnswer', function() {
    let i18nKey = 'common.save-next';
    let showFeedback = this.get('collection.showFeedback') === ASSESSMENT_SHOW_VALUES.IMMEDIATE;
    if(!this.get('hasContext') || !showFeedback) {
      if (this.get('collection').isLastResource(this.get('resource'))) {
        i18nKey = (this.get('collection').get('isAssessment')) ? 'common.save-submit' : 'common.save-finish';
      }
    } else {
      if(this.get('resourceResult.submittedAnswer')) {
        i18nKey = this.get('collection').isLastResource(this.get('resource')) ?
          'common.finish' : 'common.next';
      } else {
        i18nKey = 'common.submit';
      }
    }
    return i18nKey;
  }),


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Calculates the height of the content area (it will change depending on height
   * of the narration -if there is one)
   */
  calculateResourceContentHeight: function() {
    if (this.get('resource.isUrlResource') || this.get("resource.isPDFResource") && this.get("isNotIframeUrl")===false) {
      var narrationHeight = this.$(".narration").innerHeight();
      var contentHeight = this.$('.content').height();

      // The 4 pixels subtracted are to make sure no scroll bar will appear for the content
      // (Users should rely on the iframe scroll bar instead)
      this.set('calculatedResourceContentHeight', contentHeight - narrationHeight - 4);
    }
  }
});
