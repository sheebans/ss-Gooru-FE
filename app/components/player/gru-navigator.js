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
        this.selectItem(item);
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
  setupSubscriptions: Ember.on('didInsertElement', function() {
    const component = this;
    let resourceId = component.get("selectedResourceId");

    component.setItemAsSelected(resourceId);

    Ember.$(document).on('keyup', { _self: this }, this.navigateOnKeyUp);
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function() {
    Ember.$(document).off('keyup');
  }),

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
    this.setItemAsSelected(resourceId);
  }.observes("selectedResourceId", "collection"),


  // -------------------------------------------------------------------------

  // Methods


  navigateTo: function(directionMethod) {
    const collection = this.get("collection");
    const resource = collection.getResourceById(this.get('selectedResourceId'));
    this.selectItem(collection[directionMethod](resource));
  },
  /**
   * Triggered when a key is released from press
   * @param {Event object} event
   */
  navigateOnKeyUp: function(e) {
    if (e.which === 37 || e.which === 39){
      e.preventDefault();
      const KEY_RIGHT=39;
      const KEY_LEFT=37;
      if (e.which===KEY_RIGHT){
        e.data._self.navigateTo('nextResource');
      }else if (e.which===KEY_LEFT){
        e.data._self.navigateTo('prevResource');
      }
      return false;
    }
  },

  /**
   * Triggered when a resource item is highlighted visually
   * @param {String} itemId
   */
  setItemAsSelected: function(itemId){
    var itemElement = "#item_"+itemId;
    Ember.$( ".list-group-item" ).removeClass( "selected" );
    Ember.$(itemElement).addClass( "selected" );
  },

  /**
   * Triggered when a resource item is selected
   * @param {Resource} item
   */
  selectItem: function(item) {
    if (item){
      const itemId = item.id;
      if (this.get("onItemSelected")){
        this.sendAction("onItemSelected", item);
      }
      this.setItemAsSelected(itemId);
      this.sendAction("onCloseNavigator");
    }
  }
});
