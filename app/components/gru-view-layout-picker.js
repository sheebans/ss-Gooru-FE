import Ember from 'ember';
import {VIEW_LAYOUT_PICKER_OPTIONS} from "../config/config";

/**
 * View Layout Picker
 *
 * Component responsible for letting the user change the profile visualization
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-view-layout-picker'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Set a new visualization as selected and update the component appearance
     * @function actions:setLayout
     * @param {string} newLayout
     */
    setLayout: function(newLayout) {
      if (newLayout.get("isActive")) {
        this.cleanup();
      } else {
        this.cleanup();
        this.selectLayout(newLayout);
      }
      this.sendAction("onViewLayoutChange", this.get("selectedView"));
    }

  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * List of layouts to be displayed by the component
   *
   * @constant {Array}
   */
  viewLayouts: Ember.A([Ember.Object.create({
  'view': VIEW_LAYOUT_PICKER_OPTIONS.THUMBNAILS,
  'isActive': false,
  'icon':'th-large'
  }),Ember.Object.create({
  'view': VIEW_LAYOUT_PICKER_OPTIONS.LIST,
  'isActive': false,
  'icon':'bars'
  })]),

  /**
   * Selected view layout
   *
   * @property {string}
   */
  selectedView:null,

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Remove the actual visuatization
   */
  cleanup: function() {
    const component = this;
    component.get("viewLayouts").forEach(function(option){
      option.set("isActive", false);
      component.set("selectedView",null);
    });
  },
  /**
   * Set a new visualization
   */
  selectLayout: function(layout) {
    layout.set('isActive', true);
    this.set("selectedView",layout.view);
  }
});
