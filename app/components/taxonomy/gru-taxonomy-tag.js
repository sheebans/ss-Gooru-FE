import Ember from 'ember';

/**
 * Taxonomy Tag
 *
 * Component responsible for displaying a taxonomy item as a taxonomy tag
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'gru-taxonomy-tag'],

  classNameBindings: ['model.isActive:active', 'model.isReadonly:read-only'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    toggleState: function() {
      this.toggleProperty('model.isActive');
      this.get('onSelect')(this.get('model'));
    },

    removeTag: function() {
      this.get('onRemove')(this.get('model'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {TaxonomyItem} model - Taxonomy tag model
   */
  model: null,

  /**
   * @property {Function} onSelect - Event handler called when the clear/remove icon is selected
   */
  onRemove: null,

  /**
   * @property {Function} onSelect - Event handler called when the tag is selected
   */
  onSelect: null

});
