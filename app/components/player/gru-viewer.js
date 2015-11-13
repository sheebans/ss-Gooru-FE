import Ember from "ember";

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

  classNames:['gru-viewer'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * Narration to be displayed by the component
   *
   * @narration {object}
   */
    narration: Ember.Object.create({ 'image-url': 'http://profile-images.goorulearning.org.s3.amazonaws.com/76514d68-5f4b-48e2-b4bc-879b745f3d70.png',
    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}),

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
