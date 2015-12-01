import Ember from "ember";

/**
 * Player navigator
 *
 * Component responsible for enabling more flexible navigation options for the player.
 * For example, where {@link player/gru-navigation.js}} allows selecting only
 * the previous or the next content item, the navigator allows navigation to
 * any of the content items available.
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

  classNames:['gru-navigator'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     *
     * Triggered when an item is selected
     * @param item
     */
    selectItem: function(item){
      if (this.get("onItemSelected")){
        this.selectItem(item.id);
        this.sendAction("onItemSelected", item);
      }
    },
    /**
     * Action triggered when the user close de navigator panel
     */
    closeNavigator:function(){
      this.sendAction("onCloseNavigator");
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var resourceId = this.get("selectedResourceId");
    this.selectItem(resourceId);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Collection} collection
   */
  collection: null,

  /**
   * @property {String|Function} onItemSelected - event handler for when an item is selected
   */
  onItemSelected: null,

  /**
   * @property {String} selectedResourceId - resource Id selected
   */

  selectedResourceId:null,

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refreshes the left navigation with the selected resource id
   */
  refreshSelectedResource: function() {
    var resourceId = this.get("selectedResourceId");
    this.selectItem(resourceId);
  }.observes("selectedResourceId", "collection"),


  // -------------------------------------------------------------------------

  // Methods

  /**
   * Triggered when a resource item is selected
   * @param {string} itemId
   */
  selectItem: function(itemId) {
    if (itemId){
      var itemElement = "#item_"+itemId;
      this.$( ".list-group-item" ).removeClass( "selected" );
      this.$(itemElement).addClass( "selected" );
    }
  }
});
