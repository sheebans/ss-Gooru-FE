import Ember from 'ember';

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
     * Set a new visualization as selected and update the component appearance accordingly
     * @function actions:setVisualization
     * @param {string} newVisualization
     */
    setVisualization: function(newVisualization) {

    }

  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * List of layouts to be displayed by the component
   *
   * @constant {Array}
   */
  viewLayouts: [
    {
      'view': 'thumbnails',
      'isActive': false,
      'icon':'bars'
    },
    {
      'view': 'list',
      'isActive': false,
      'icon':'th-large'
    }],
});
