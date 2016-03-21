import Ember from 'ember';
/**
 * Audience component
 *
 * Component responsible for show the audience
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['content','gru-audience'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicate if a course information is in edit mode
   * @property {Boolean}
   */
  isEditing:null,

});
