import Ember from 'ember';
/**
 * Url resource component
 *
 * Component responsible for controlling the logic and appearance of the url resource type
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

  classNames:['gru-url-resource'],
  attributeBindings: ['resourceHeight:style'],

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
   * @property {Number} the calculated resource content height
   */

  calculatedResourceContentHeight: null,

  /**
   * @property {string} bind the height css style for the component
   */
  resourceHeight: Ember.computed("calculatedResourceContentHeight", function(){
    var height = this.get('calculatedResourceContentHeight');
    return 'height: '+height+'px';
  })
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
