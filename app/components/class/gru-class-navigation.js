import Ember from "ember";

/**
 * Class navigation
 *
 * Component responsible for enabling more flexible navigation options for the class.
 * For example, where {@link class/gru-class-navigation.js}} allows access the class information and navigate through the menu options.
 * @module
 * @see controllers/class.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-class-navigation'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function(item){
      if (this.get("onItemSelected")){
        this.selectItem(item);
        this.sendAction("onItemSelected", item);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get("selectedMenuItem");
    this.selectItem(item);
  },


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class
   */
  class: null,

  /**
   * @property {String|Function} onItemSelected - event handler for when an menu item is selected
   */
  onItemSelected: null,

  /**
   * @property {String} selectedMenuItem - menu Item selected
   */

  selectedMenuItem:null,

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refreshes the left navigation with the selected menu item
   */
  refreshSelectedMenuItem: function() {
    var item = this.get("selectedMenuItem");
    this.selectItem(item);
  }.observes("selectedMenuItem"),


  // -------------------------------------------------------------------------

  // Methods

  /**
   * Triggered when a menu item is selected
   * @param {string} item
   */
  selectItem: function(item) {
    if (item){
      var itemElement = "."+item;
      this.$( ".list-group-item" ).removeClass( "selected" );
      this.$(itemElement).addClass( "selected" );
    }
  }
});
