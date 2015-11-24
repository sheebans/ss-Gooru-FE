import Ember from 'ember';
/**
 * Youtube resource component
 *
 * Component responsible for controlling the logic and appearance of the youtube resource type
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 * @augments Ember/Component
 **/

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-youtube-resource'],

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
  youtubeUrl: Ember.computed("resource.url", function(){
    return this.get("resource.url").replace(/watch\?v=/g, "embed/");
  }),

  /**
   * @property {string}Begin playing the video at the given number of seconds from the start of the video
   */
  start: Ember.computed("resource.start", function(){
    return this.get("resource.start");
  }),

  /**
   * @property {string}The time, measured in seconds from the start of the video, when the player should stop playing the video
   */
  stop: Ember.computed("resource.stop", function(){
    return this.get("resource.stop");
  })
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
