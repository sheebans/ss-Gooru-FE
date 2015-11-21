import Ember from 'ember';

/**
 * Image resource component
 *
 * Component responsible for controlling the logic and appearance of the image resource type
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 * @augments Ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-image-resource'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource} the resource
   */
  resource: null,

  /**
   * @property {string} full resource image url
   */
  imageUrl: Ember.computed("resource.url", function(){
    return this.get("resource.assetUri") +
      this.get("resource.folder") +
      this.get("resource.url");
  })

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
