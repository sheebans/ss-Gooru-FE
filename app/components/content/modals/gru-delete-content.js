import Ember from 'ember';
/**
 * Delete content component
 *
 * Component responsible for delete a content from content builder
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-delete-content'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * This is the model used to delete.
   * @property {model}
   */
  model: null

});
