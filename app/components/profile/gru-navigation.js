import Ember from "ember";

/**
 * Profile navigation
 *
 * Component responsible for enabling navigation between sub-sections within /profile
 * @module
 * @see controllers/class.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['profile gru-navigation'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     *
     * Triggered when the name or the image of the user displayed in the profile navigation is selected
     * @param userId
     */
    selectUser: function (userId) {
      Ember.Logger.debug('User with ID ' + userId + ' was selected');
    },

    /**
     *
     * Triggered when an menu item is selected
     * @param item
     */
    selectItem: function (item) {
      if (this.get("onItemSelected")) {
        this.sendAction("onItemSelected", item);
      }
    }

  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function () {
    var item = this.get("selectedMenuItem");
    this.actions.selectItem.call(this, item);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String|Function} onItemSelected - event handler for when an menu item is selected
   */
  onItemSelected: null,

  /**
   * @property {String} selectedMenuItem - menu Item selected
   */

  selectedMenuItem: null,


  // -------------------------------------------------------------------------
  // Observers
  /**
   * Refreshes the left navigation with the selected menu item
   */
  refreshSelectedMenuItem: function () {
    var item = this.get("selectedMenuItem");
    this.selectItem(item);
  }.observes("selectedMenuItem")


  // -------------------------------------------------------------------------
  // Methods


});
