import Ember from 'ember';
/**
 * Resource and Question card
 *
 * Component responsible of showing the resource or question information in cards, so that most useful information is summarized there.
 * @module
 */

export default Ember.Component.extend({
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-resource-card'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource/Question} resource
   */
  resource: null

});
