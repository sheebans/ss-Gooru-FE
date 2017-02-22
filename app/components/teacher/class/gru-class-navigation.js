import Ember from "ember";
import ConfigurationMixin from 'gooru-web/mixins/configuration';
/**
 * Teacher class navigation
 *
 * Component responsible for enabling more flexible navigation options for the teacher class.
 * For example, where {@link teacher/class/gru-class-navigation.js}} allows access the teacher class information and navigate through the menu options.
 * @module
 * @see controllers/teacher/class.js
 * @augments ember/Component
 */
export default Ember.Component.extend(ConfigurationMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-class-navigation', 'teacher'],

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

  willDestroyElement() {
    this._super(...arguments);
    this.set('selectedMenuItem', null);
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
   * Triggered when a menu item is selected. Set the class icon for the item selected showing in the mobiles dropdown menu.
   * @param {string} item
   */
  selectItem: function(item) {
    if(item) {
      var itemElement = "."+item;
      this.$('.tab').removeClass('active');
      this.$(itemElement).addClass('active');
    }
  }
});
