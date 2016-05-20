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

  classNameBindings: ['isActive:active', 'isReadonly:read-only'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    toggleState: function() {
      this.toggleProperty('isActive');
      this.get('onSelect')(this.get('model'));
    },

    removeTag: function() {
      this.get('onRemove')(this.get('model'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean} isActive - Is the state of the tag active or not?
   */
  isActive: false,

  /**
   * @property {boolean} isReadonly - Is the tag read-only or does it accept changes
   * to its state (e.g. by clicking on it)
   */
  isReadonly: false,

  /**
   * @property {boolean} isRemovable - Does the tag show a clear/remove icon to
   * trigger an action for its removal
   */
  isRemovable: false,

  /**
   * @property {TaxonomyItem} model - Taxonomy item model
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
