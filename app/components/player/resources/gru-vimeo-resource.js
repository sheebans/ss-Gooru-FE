import Ember from 'ember';
import Env from '../../../config/environment';
/**
 * Vimeo resource component
 *
 * Component responsible for controlling the logic and appearance of the vimeo resource type
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-viewer.js
 * @augments Ember/Component
 **/
export default Ember.Component.extend(Env,{
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-vimeo-resource'],

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
   * @property {string} full resource vimeo url
   */
  vimeoUrl: Ember.computed("resource.url", function(){
    return Env['player'].vimeoPlayerUrl+this.get("resource.url").replace('https://vimeo.com/','');
  }),
});
