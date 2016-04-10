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
  actions: {
    editResource: function(){
      this.sendAction("onEditResource", this.get("resource"));
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource/Question} resource
   */
  resource: null,

  /**
   * Indicates if the edit functionality is enabled
   * @property {boolean}
   */
  editEnabled: false,

  /**
   * Indicates if the edit functionality is enabled
   * @property {boolean}
   */
  remixEnabled: true,

  /**
   * Indicates if the edit functionality is enabled
   * @property {boolean}
   */
  addEnabled: true,

  /**
   * @property {string} edit action
   */
  onEditResource: null

});
