import Ember from 'ember';
import { RESOURCE_COMPONENT_MAP } from 'gooru-web/config/config';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/resource
   */
  resourceService: Ember.inject.service("api-sdk/resource"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'resources', 'gru-resource-play'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions
  actions:  {
    /**
     * Performs a back action in the browser history
     */
    goBack: function() {
      window.history.go(-1);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement: function() {
    this.calculateResourceContentHeight();
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Resource model as instantiated by the route. This is the model used when not editing
   * or after any resource changes have been saved.
   * @property {Resource}
   */
  resource: null,

  /**
   * @property {Resource}
   */
  playerResource: Ember.computed("resource", function(){
    return this.get("resource").toPlayerResource();
  }),

  /* Calculated height designated for the content area of a resource
  * @see components/player/resources/gru-url-resource.js
  * @property {Number}
  */
  calculatedResourceContentHeight: 0,

  /**
   * Calculates the component name that renders the resource
   */
  resourceComponent: Ember.computed('resource.resourceType', function() {
    return RESOURCE_COMPONENT_MAP[this.get('resource.resourceType')];
  }),

  /**
   * Indicates if the current resource type is resource
   * @property {boolean}
   */
  isNotIframeUrl: Ember.computed("resource", function(){
    const resource = this.get("resource");

    return (resource && resource.displayGuide && (resource.displayGuide.is_broken ===1 || resource.displayGuide.is_frame_breaker ===1));
  }),

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Observes for the resource change
   */
  resourceObserver: Ember.observer('resource.id', function() {
    this.calculateResourceContentHeight();
  }),

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('resource.standards.[]', function() {
    return TaxonomyTag.getTaxonomyTags(this.get("resource.standards"), false);
  }),


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Calculates the height of the content area (it will change depending on height
   * of the narration -if there is one)
   */
  calculateResourceContentHeight: function() {
    if (this.get("resource.isUrlResource") || this.get("resource.isPDFResource")) {
      let $component = this.$();
      let $header = $component.find('header');
      this.set('calculatedResourceContentHeight', $component.outerHeight(true) - $header.outerHeight(true) - 20);
    }
  }
});
