import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function() {
    var item = this.get("menuItem");
    this.selectItem(item);
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  class: null,

  /**
   * The course presented to the user
   * @property {Course}
   */
  course: null,

  /**
   * The units presented to the user
   * @property {Unit}
   */
  units: null,

   /**
   * The menuItem selected
   * @property {String}
   */
   menuItem: null,

  /**
   * @property {ClassContentVisibility}
   */
  contentVisibility: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item){
    this.set('menuItem', item);
  }
});
