import Ember from 'ember';
import { RESOURCE_COMPONENT_MAP } from 'gooru-web/config/config';

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

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Observes for the resource change
   */
  resourceObserver: Ember.observer('resource.id', function() {
    this.calculateResourceContentHeight();
  }),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Calculates the height of the content area (it will change depending on height
   * of the narration -if there is one)
   */
  calculateResourceContentHeight: function() {
    if (this.get('resource.resourceType') && this.get('resource.resourceType').indexOf('url') > -1) {
      let $component = this.$();
      let $header = $component.find('header');
      this.set('calculatedResourceContentHeight', $component.outerHeight(true) - $header.outerHeight(true) - 20);
    }
  }
});
